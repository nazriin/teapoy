import express from "express";
import {
    createSeller,
    deleteSeller,
    getAllSellers,
    getSeller,
    loginSeller,
    updateSeller
} from "../controllers/sellerController.js";
import {createSellerValidation} from "../middleware/sellerAuth.js";

const router = express.Router();

router
    .get("/seller",getAllSellers)
    .post("/api/seller", createSeller)
    .get("/seller/:id",getSeller)
    .post("/api/seller/login",loginSeller)
    .put("/seller/:id",updateSeller)
    .delete("/seller/:id",deleteSeller)

export default router;

