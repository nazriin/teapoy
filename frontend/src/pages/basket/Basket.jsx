import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Trash2, Plus, Minus, ShoppingCart, MapPin, User, Phone, Mail, XCircle } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    useDeleteOneBasketItemMutation,
    useEditBasketItemMutation,
    useGetBasketItemsQuery,
    useDeleteAllBasketItemsMutation
} from "../../services/basketApi.js";
import { useCreateTrackingMutation } from "../../services/trackingApi.js";

// Shipping address validation schema
const shippingSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters')
        .required('First name is required'),
    lastName: Yup.string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be less than 50 characters')
        .required('Last name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    phone: Yup.string()
        .matches(/^[0-9\-+\s()]+$/, 'Invalid phone number')
        .min(10, 'Phone number must be at least 10 digits')
        .required('Phone number is required'),
    street: Yup.string()
        .min(5, 'Street address must be at least 5 characters')
        .required('Street address is required'),
    city: Yup.string()
        .min(2, 'City must be at least 2 characters')
        .required('City is required'),
    state: Yup.string()
        .min(2, 'State must be at least 2 characters')
        .required('State is required'),
    zipCode: Yup.string()
        .matches(/^[0-9]{5}(-[0-9]{4})?$/, 'Invalid ZIP code')
        .required('ZIP code is required'),
    country: Yup.string()
        .required('Country is required')
});

const Basket = () => {
    const { userId } = useOutletContext() || {};
    const [showShippingForm, setShowShippingForm] = useState(false);
    const [isProcessingOrder, setIsProcessingOrder] = useState(false);

    const { data: basket, isLoading, isError, error, refetch } = useGetBasketItemsQuery(userId, {
        skip: !userId,
    });

    const [updateBasketItem] = useEditBasketItemMutation();
    const [removeBasketItem] = useDeleteOneBasketItemMutation();
    const [createTracking] = useCreateTrackingMutation();
    const [deleteAllBasketItems] = useDeleteAllBasketItemsMutation();

    const handleUpdateQuantity = async (basketItemId, currentCount, operation) => {
        if (!userId) {
            toast.error('Please log in to manage your basket.', { position: 'top-right' });
            return;
        }

        let newCount = currentCount;
        if (operation === 'increase') {
            newCount = currentCount + 1;
        } else if (operation === 'decrease') {
            newCount = currentCount - 1;
        }

        if (newCount <= 0) {
            handleRemoveItem(basketItemId);
            return;
        }

        try {
            await updateBasketItem({ id: basketItemId, count: newCount, userId }).unwrap();
            toast.success('Basket item quantity updated!', { position: 'top-right', autoClose: 1500 });
            refetch();
        } catch (err) {
            console.error('Failed to update basket item quantity:', err);
            const errorMessage = err.data?.message || 'Error updating item quantity.';
            toast.error(errorMessage, { position: 'top-right' });
        }
    };

    const handleRemoveItem = async (basketItemId) => {
        if (!userId) {
            toast.error('Please log in to manage your basket.', { position: 'top-right' });
            return;
        }

        try {
            await removeBasketItem({ id: basketItemId, userId }).unwrap();
            toast.success('Item removed from basket!', { position: 'top-right', autoClose: 1500 });
            refetch();
        } catch (err) {
            console.error('Failed to remove basket item:', err);
            const errorMessage = err.data?.message || 'Error removing item from basket.';
            toast.error(errorMessage, { position: 'top-right' });
        }
    };

    const handleProceedToCheckout = () => {
        if (!userId) {
            toast.error('Please log in to proceed to checkout.', { position: 'top-right' });
            return;
        }

        if (basketItems.length === 0) {
            toast.info('Your basket is empty. Add items before checking out.', { position: 'top-right' });
            return;
        }

        setShowShippingForm(true);
    };

    const handleSubmitOrder = async (shippingData) => {
        setIsProcessingOrder(true);

        try {
            // Debug: Log the form data received
            console.log('Form data received:', shippingData);

            // Check if required fields are present (though Yup handles this, good for sanity check)
            if (!shippingData.firstName || !shippingData.lastName || !shippingData.email || !shippingData.phone) {
                toast.error('Please fill in all required customer information fields.', { position: 'top-right' });
                setIsProcessingOrder(false);
                return;
            }

            const trackingData = {
                userId: userId,
                orderItems: basketItems.map(item => ({
                    productId: item.productId?._id, // Ensure productId exists
                    quantity: item.count,
                    price: item.productId?.price, // Ensure price exists
                })),
                totalAmount: totalAmount,
                shippingAddress: {
                    street: shippingData.street,
                    city: shippingData.city,
                    state: shippingData.state,
                    zipCode: shippingData.zipCode,
                    country: shippingData.country,
                },
                customerInfo: {
                    firstName: shippingData.firstName,
                    lastName: shippingData.lastName,
                    email: shippingData.email,
                    phone: shippingData.phone,
                }
            };

            // Debug: Log the tracking data being sent
            console.log('Tracking data being sent:', trackingData);
            console.log('CustomerInfo specifically:', trackingData.customerInfo);

            const result = await createTracking(trackingData).unwrap();
            toast.success('Order placed successfully! Tracking initiated.', { position: 'top-right', autoClose: 3000 });

            // After successfully creating the tracking, delete all basket items for the user
            await deleteAllBasketItems({ userId }).unwrap();
            toast.success('Basket cleared!', { position: 'top-right', autoClose: 1500 });


            setShowShippingForm(false);
            // refetch is already called by invalidatesTags in deleteAllBasketItems,
            // but keeping it here for immediate UI update in case invalidatesTags is not instant.
            refetch();

            console.log("Tracking created:", result);
        } catch (err) {
            console.error('Failed to process order:', err);
            console.error('Error details:', err.data);
            const errorMessage = err.data?.message || 'Error processing your order.';
            toast.error(errorMessage, { position: 'top-right' });
        } finally {
            setIsProcessingOrder(false);
        }
    };

    if (!userId) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center font-sans">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Shopping Basket</h2>
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                    <ShoppingCart className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Please <Link to="/login" className="text-purple-600 hover:underline font-semibold">log in</Link> to view and manage your shopping basket.</p>
                </div>
                <ToastContainer />
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen font-sans">
                <div className="text-xl font-semibold text-gray-700">Loading basket...</div>
            </div>
        );
    }

    // --- START OF MODIFIED ERROR HANDLING ---
    if (isError) {
        console.error("Basket fetch error:", error);
        const errorMessage = error?.data?.message;

        // Check for the specific "no item" error message
        if (errorMessage && errorMessage.includes("you don't have any item")) {
            return (
                <div className="container mx-auto px-4 py-8 max-w-4xl text-center font-sans">
                    <ToastContainer />
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Shopping Basket</h2>
                    <div className="bg-white p-8 rounded-lg shadow-md text-center border border-gray-200">
                        <XCircle className="w-20 h-20 text-red-400 mx-auto mb-6" />
                        <p className="text-gray-700 text-xl font-semibold mb-3">Oops! Something went wrong.</p>
                        <p className="text-gray-600 text-lg mb-4">
                            It looks like there was an issue loading your basket items.
                            You might not have any items in your basket yet, or there was a temporary problem.
                        </p>
                        <Link to="/user/shop" className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors shadow-lg">
                            <ShoppingCart className="w-5 h-5 mr-2" /> Start Shopping
                        </Link>
                        <p className="text-gray-500 text-sm mt-4">If the problem persists, please contact support.</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex justify-center items-center h-screen text-red-600 font-sans">
                Error loading your basket. {errorMessage || 'Please try again later.'}
                <ToastContainer />
            </div>
        );
    }
    // --- END OF MODIFIED ERROR HANDLING ---

    const basketItems = basket?.data || [];
    const totalAmount = basketItems.reduce((sum, item) => sum + (item.productId?.price * item.count || 0), 0);

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl font-sans">
            <ToastContainer />
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Shopping Basket</h2>

            {basketItems.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-md text-center border border-gray-200">
                    <ShoppingCart className="w-20 h-20 text-purple-400 mx-auto mb-6" />
                    <p className="text-gray-600 text-lg mb-4">Your basket is empty.</p>
                    <Link to="/shop" className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors shadow-lg">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Basket Items */}
                    <div className="lg:col-span-2">
                        {basketItems.map((item) => (
                            <div key={item._id} className="flex items-center bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200">
                                <img
                                    src={item.productId?.imageUrl || `https://placehold.co/96x96/E0E0E0/666666?text=No+Image`}
                                    alt={item.productId?.name || 'Product'}
                                    className="w-24 h-24 object-cover rounded-md mr-4 flex-shrink-0"
                                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/96x96/E0E0E0/666666?text=No+Image`; }}
                                />
                                <div className="flex-grow">
                                    <Link to={`/product/${item.productId?._id}`} className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors">
                                        {item.productId?.name || 'Unknown Product'}
                                    </Link>
                                    <p className="text-gray-600 text-sm">{item.productId?.category?.name || 'Uncategorized'}</p>
                                    <p className="text-purple-700 font-bold text-md mt-1">${item.productId?.price?.toFixed(2) || '0.00'}</p>
                                </div>
                                <div className="flex items-center space-x-2 mr-4">
                                    <button
                                        onClick={() => handleUpdateQuantity(item._id, item.count, 'decrease')}
                                        className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                        disabled={item.count <= 1}
                                    >
                                        <Minus className="w-4 h-4 text-gray-700" />
                                    </button>
                                    <span className="font-semibold text-lg text-gray-800">{item.count}</span>
                                    <button
                                        onClick={() => handleUpdateQuantity(item._id, item.count, 'increase')}
                                        className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors shadow-sm"
                                    >
                                        <Plus className="w-4 h-4 text-gray-700" />
                                    </button>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="text-lg font-bold text-purple-800">${(item.productId?.price * item.count || 0).toFixed(2)}</p>
                                    <button
                                        onClick={() => handleRemoveItem(item._id)}
                                        className="text-red-500 hover:text-red-700 mt-2 p-1 rounded-full hover:bg-red-50 transition-colors shadow-sm"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary and Shipping Form */}
                    <div className="lg:col-span-1">
                        {!showShippingForm ? (
                            // Order Summary
                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-4">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-gray-700">Subtotal:</span>
                                    <span className="font-semibold text-gray-800">${totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-gray-700">Shipping:</span>
                                    <span className="font-semibold text-gray-800">Free</span>
                                </div>
                                <div className="border-t border-gray-300 pt-4 mt-4 flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-800">Total:</span>
                                    <span className="text-xl font-bold text-purple-700">${totalAmount.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={handleProceedToCheckout}
                                    className="w-full bg-purple-600 text-white py-3 mt-6 rounded-md hover:bg-purple-700 transition-colors text-lg font-semibold shadow-lg"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        ) : (
                            // Shipping Form
                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                <div className="flex items-center mb-4">
                                    <MapPin className="w-6 h-6 text-purple-600 mr-2" />
                                    <h3 className="text-xl font-bold text-gray-800">Shipping Information</h3>
                                </div>

                                <Formik
                                    initialValues={{
                                        firstName: '',
                                        lastName: '',
                                        email: '',
                                        phone: '',
                                        street: '',
                                        city: '',
                                        state: '',
                                        zipCode: '',
                                        country: 'US'
                                    }}
                                    validationSchema={shippingSchema}
                                    onSubmit={(values, { setSubmitting }) => {
                                        console.log('Formik form values:', values);
                                        handleSubmitOrder(values);
                                        setSubmitting(false);
                                    }}
                                >
                                    {({ isSubmitting }) => (
                                        <Form className="space-y-4">
                                            {/* First Name */}
                                            <div>
                                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                                <div className="relative rounded-md shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </div>
                                                    <Field
                                                        type="text"
                                                        id="firstName"
                                                        name="firstName"
                                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                                        placeholder="John"
                                                    />
                                                </div>
                                                <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1" />
                                            </div>

                                            {/* Last Name */}
                                            <div>
                                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                                <div className="relative rounded-md shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </div>
                                                    <Field
                                                        type="text"
                                                        id="lastName"
                                                        name="lastName"
                                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                                        placeholder="Doe"
                                                    />
                                                </div>
                                                <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1" />
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                <div className="relative rounded-md shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </div>
                                                    <Field
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                                        placeholder="you@example.com"
                                                    />
                                                </div>
                                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                                            </div>

                                            {/* Phone */}
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                                <div className="relative rounded-md shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </div>
                                                    <Field
                                                        type="tel"
                                                        id="phone"
                                                        name="phone"
                                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                                        placeholder="+1 (555) 123-4567"
                                                    />
                                                </div>
                                                <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
                                            </div>

                                            {/* Street Address */}
                                            <div>
                                                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                                <div className="relative rounded-md shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <MapPin className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </div>
                                                    <Field
                                                        type="text"
                                                        id="street"
                                                        name="street"
                                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                                        placeholder="123 Main St"
                                                    />
                                                </div>
                                                <ErrorMessage name="street" component="div" className="text-red-500 text-xs mt-1" />
                                            </div>

                                            {/* City */}
                                            <div>
                                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                                <Field
                                                    type="text"
                                                    id="city"
                                                    name="city"
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                                    placeholder="Anytown"
                                                />
                                                <ErrorMessage name="city" component="div" className="text-red-500 text-xs mt-1" />
                                            </div>

                                            {/* State */}
                                            <div>
                                                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
                                                <Field
                                                    type="text"
                                                    id="state"
                                                    name="state"
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                                    placeholder="CA"
                                                />
                                                <ErrorMessage name="state" component="div" className="text-red-500 text-xs mt-1" />
                                            </div>

                                            {/* ZIP Code */}
                                            <div>
                                                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postal Code</label>
                                                <Field
                                                    type="text"
                                                    id="zipCode"
                                                    name="zipCode"
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                                    placeholder="90210"
                                                />
                                                <ErrorMessage name="zipCode" component="div" className="text-red-500 text-xs mt-1" />
                                            </div>

                                            {/* Country */}
                                            <div>
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                                <Field
                                                    as="select"
                                                    id="country"
                                                    name="country"
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                                >
                                                    <option value="US">United States</option>
                                                    <option value="CA">Canada</option>
                                                    <option value="GB">United Kingdom</option>
                                                    <option value="AU">Australia</option>
                                                    <option value="DE">Germany</option>
                                                    <option value="FR">France</option>
                                                    <option value="JP">Japan</option>
                                                    <option value="AZ">Azerbaijan</option>
                                                    <option value="TR">Turkey</option>
                                                </Field>
                                                <ErrorMessage name="country" component="div" className="text-red-500 text-xs mt-1" />
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                                disabled={isProcessingOrder || isSubmitting}
                                            >
                                                {isProcessingOrder ? 'Processing...' : 'Place Order'}
                                            </button>
                                            {/* Back button to go back to order summary */}
                                            <button
                                                type="button"
                                                onClick={() => setShowShippingForm(false)}
                                                className="w-full bg-gray-200 text-gray-800 py-3 mt-2 rounded-md hover:bg-gray-300 transition-colors font-semibold shadow-md"
                                                disabled={isProcessingOrder || isSubmitting}
                                            >
                                                Back to Basket
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Basket;