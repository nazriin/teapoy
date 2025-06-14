import express from "express";
import {createSeller, deleteSeller, getAllSellers, getSeller, updateSeller} from "../controllers/sellerController.js";


const router = express.Router();

router
    .get("/seller",getAllSellers)
    .post("/seller",createSeller)
    .get("/seller/:id",getSeller)
    .put("/seller/:id",updateSeller)
    .delete("/seller/:id",deleteSeller)

export default router;

