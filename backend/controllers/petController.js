// controllers/petController.js
import { Pet } from '../models/petModel.js';

// Create a new pet
export const createPet = async (req, res) => {
    try {
        const { name, description, image, information, breed, age, isAdopted } = req.body; // Added breed, age, isAdopted

        const pet = new Pet({
            name,
            description,
            breed, // Included breed
            age,   // Included age
            image,
            information,
            isAdopted // Included isAdopted
        });

        await pet.save();
        res.status(201).json({ message: 'Pet created successfully', pet });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all pets
export const getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find({});
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single pet by ID
export const getPetById = async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await Pet.findById(id);

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.status(200).json(pet);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid pet ID format' });
        }
        res.status(500).json({ message: error.message });
    }
};

// Update a pet
export const updatePet = async (req, res) => {
    try {
        const { id } = req.params;
        // Added breed, age, and isAdopted to destructured body
        const { name, description, image, information, breed, age, isAdopted } = req.body;

        const pet = await Pet.findByIdAndUpdate(
            id,
            { name, description, image, information, breed, age, isAdopted }, // Included breed, age, isAdopted in update
            { new: true, runValidators: true } // Return the updated document and run schema validators
        );

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.status(200).json({ message: 'Pet updated successfully', pet });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid pet ID format' });
        }
        res.status(400).json({ message: error.message });
    }
};

// Delete a pet
export const deletePet = async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await Pet.findByIdAndDelete(id);

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid pet ID format' });
        }
        res.status(500).json({ message: error.message });
    }
};