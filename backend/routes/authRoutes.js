// authRoutes.js
import express from 'express';
import { protect, sellerOnly } from '../middleware/authMiddleware.js';
import { getCurrentUser, login, logout, register } from '../controllers/authController.js';
import { requestOTPSignup, verifyOTPRegister } from "../controllers/otp.js";
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    searchCategories,
    getCategoryStats
} from '../controllers/categoryController.js';
import {
    addProduct,
    deleteProduct,
    getAllProducts, getProductById,
    getSellerProducts,
    updateProduct
} from "../controllers/productController.js";
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "../controllers/blogController.js";
import { getAdminProfile, loginAdmin, logoutAdmin } from "../controllers/adminController.js";
import { addItem, deleteAllItem, deleteOneItem, editItem, getBasketItems } from "../controllers/basketController.js";
import {
    addWItem,
    deleteWAllItem,
    deleteWOneItem,
    editWItem,
    getWishlistItems
} from "../controllers/wishlistController.js";
import { protectAdmin } from "../middleware/adminAuth.js";
import {
    createBlogCategory, deleteBlogCategory,
    getAllBlogCategories,
    getBlogCategoryById,
    updateBlogCategory
} from "../controllers/blogCategoryController.js";
import { addService, getAllServices, getServiceById, updateService, deleteService } from "../controllers/servicesController.js";
import {sendAppointmentRequest} from "../controllers/contactController.js";
import {createPet, deletePet, getAllPets, getPetById, updatePet} from "../controllers/petController.js"; // New import

import {
    createTracking,
    getTrackingById,
    getUserTrackings,
    updateTrackingStatus,
    getAllTrackings,
    deleteTracking,
    getTrackingStats
} from '../controllers/trackingController.js';
import {sendAdoptionInquiry} from "../controllers/adoptionController.js";
import {handleAppointmentSubmission} from "../controllers/contactUsController.js";

const router = express.Router();

// Auth routes
router.get('/me', protect, getCurrentUser);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/request-otp-signup', requestOTPSignup);
router.post('/verify-otp-register', verifyOTPRegister);

// Product CRUD routes
router.post('/product/add', protect, addProduct);
router.get('/product/seller', protect, getSellerProducts);
router.put('/product/:productId', protect, updateProduct);
router.delete('/product/:productId', protect, deleteProduct);
router.get('/product/all', getAllProducts);
router.get('/product/:productId', getProductById)

// Category CRUD routes
router.post('/category/create', createCategory);
router.get('/category', getAllCategories);
router.get('/category/search', searchCategories);
router.get('/category/stats', getCategoryStats);
router.get('/category/:id', getCategoryById);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

// Blog Category CRUD routes
router.post('/blog-category', createBlogCategory);
router.get('/blog-category', getAllBlogCategories);
router.get('/blog-category/:id', getBlogCategoryById);
router.put('/blog-category/:id', updateBlogCategory);
router.delete('/blog-category/:id', deleteBlogCategory);

// Blog CRUD routes
router.post('/blog', createBlog);
router.get('/blogs', getAllBlogs);
router.put('/blog/:blogId', updateBlog);
router.delete('/blog/:blogId', deleteBlog);
router.get('/blog/:blogId', getBlogById);

// Service CRUD routes (New)
router.post('/service/add', addService); // Only admin can add services
router.get('/service/all', getAllServices);
router.get('/service/:serviceId', getServiceById);
router.put('/service/:serviceId',updateService); // Only admin can update services
router.delete('/service/:serviceId', deleteService); // Only admin can delete services

router.post('/admin/login', loginAdmin);
router.post('/admin/logout', logoutAdmin);
router.get('/admin/profile', protectAdmin, getAdminProfile);

router.post('/wishlist/add', addWItem);
router.get('/wishlist/:userId', getWishlistItems);
router.delete('/wishlist/delete/one/:id', deleteWOneItem);
router.delete('/wishlist/delete/all/:userId', deleteWAllItem);
router.put('/wishlist/:id', editWItem);

router.post('/basket/add', addItem);
router.get('/basket/:userId', getBasketItems);
router.put('/basket/:id', editItem);
router.delete('/basket/:id', deleteOneItem);
router.delete('/basket/all/:userId', deleteAllItem);

router.post('/pets', createPet); // Changed from /pet/add
router.get('/pets', getAllPets); // Changed from /pet/all
router.get('/pets/:id', getPetById);
router.put('/pets/:id', updatePet);
router.delete('/pets/:id', deletePet);

router.post('/contact/appointment', sendAppointmentRequest);
router.post('/tracking/create', createTracking);
router.get('/tracking/:trackingId', getTrackingById);
router.get('/tracking/user/:userId', getUserTrackings);
router.put('/tracking/:trackingId/status', updateTrackingStatus);
router.get('/tracking/all', getAllTrackings);
router.delete('/tracking/:trackingId', deleteTracking);
router.get('/stats/overview', getTrackingStats);

router.post('/adoption', sendAdoptionInquiry);

router.post('/appointment', handleAppointmentSubmission);

export default router;
