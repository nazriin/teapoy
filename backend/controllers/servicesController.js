// servicesController.js
import { Service } from '../models/servicesModel.js'; // Make sure to create this model

// Add a new service
export const addService = async (req, res) => {
    try {
        const { name, description, longDescription, price, rating, reviews, features, gallery, icon } = req.body;

        const service = new Service({
            name,
            description,
            longDescription,
            price,
            rating,
            reviews,
            features,
            gallery,
            icon
        });

        await service.save();
        res.status(201).json({ message: 'Service added successfully', service });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all services
export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find({});
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single service by ID
export const getServiceById = async (req, res) => {
    try {
        const { serviceId } = req.params;
        const service = await Service.findById(serviceId);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json(service);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid service ID format' });
        }
        res.status(500).json({ message: error.message });
    }
};

// Update a service
export const updateService = async (req, res) => {
    try {
        const { serviceId } = req.params;
        const updates = req.body;

        const service = await Service.findByIdAndUpdate(serviceId, updates, { new: true, runValidators: true });

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json({ message: 'Service updated successfully', service });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid service ID format' });
        }
        res.status(500).json({ message: error.message });
    }
};

// Delete a service
export const deleteService = async (req, res) => {
    try {
        const { serviceId } = req.params;

        const service = await Service.findByIdAndDelete(serviceId);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid service ID format' });
        }
        res.status(500).json({ message: error.message });
    }
};