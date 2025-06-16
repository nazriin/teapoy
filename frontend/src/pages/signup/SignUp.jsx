import React, { useState } from "react";

const UserSignup = () => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        phone: "",
        role: "user", // user və seller seçilə bilər
        address: {
            street: "",
            city: "",
            state: "",
            country: "",
            zipCode: "",
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("address.")) {
            const key = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, [key]: value },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);

        // Burada Axios və ya Fetch ilə backende göndərə bilərsən
        // Məs: axios.post("/api/users", formData)
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Sign Up
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name & Surname */}
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block mb-1 font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full border rounded px-3 py-2"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block mb-1 font-medium">Surname</label>
                            <input
                                type="text"
                                name="surname"
                                className="w-full border rounded px-3 py-2"
                                value={formData.surname}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border rounded px-3 py-2"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full border rounded px-3 py-2"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block mb-1 font-medium">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            className="w-full border rounded px-3 py-2"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block mb-1 font-medium">Role</label>
                        <select
                            name="role"
                            className="w-full border rounded px-3 py-2"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="user">User</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>

                    {/* Address */}
                    <fieldset className="border border-gray-300 p-4 rounded">
                        <legend className="text-sm text-gray-600 px-2">Address</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="address.street"
                                placeholder="Street"
                                className="border rounded px-3 py-2"
                                value={formData.address.street}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="address.city"
                                placeholder="City"
                                className="border rounded px-3 py-2"
                                value={formData.address.city}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="address.state"
                                placeholder="State"
                                className="border rounded px-3 py-2"
                                value={formData.address.state}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="address.country"
                                placeholder="Country"
                                className="border rounded px-3 py-2"
                                value={formData.address.country}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="address.zipCode"
                                placeholder="Zip Code"
                                className="border rounded px-3 py-2"
                                value={formData.address.zipCode}
                                onChange={handleChange}
                            />
                        </div>
                    </fieldset>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserSignup;
