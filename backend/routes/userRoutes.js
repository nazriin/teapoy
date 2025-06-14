import express from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    loginUser,
    logout,
    updateUser
} from "../controllers/userController.js";


const router = express.Router();

router
    .get("/user",getAllUsers)
    .post("/user",createUser)
    .post("/user/login",loginUser)
    .post("/user/logout",logout)
    .get("/user/:id",getUser)
    .put("/user/:id",updateUser)
    .delete("/user/:id",deleteUser)

export default router;