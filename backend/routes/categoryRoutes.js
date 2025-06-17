import express from "express";
import {getCategories, getProductsByCategory} from "../controllers/categoryController.js";

const router=express.Router();

router
    .get('/categories',getCategories)
    .get('/products/category/:categoryId',getProductsByCategory)


export default router


