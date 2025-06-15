import express from "express"

import {
    getallusers,
    newadmin, 
    getUserStats, 
    getAdminStats,
    getUserProfile,
    updateUserProfile,
    promoteToAdmin,
    dismissAdmin,
    deleteUser
} from "../controllers/usercontroller.js"

import {authenticate, authorized} from "../middlewares/authmiddleware.js"

import { borrowedbooks } from "../controllers/borrowcomtrollers.js";

const router = express.Router();

// Admin routes
router.get("/all", authenticate, authorized("Admin"), getallusers);
router.post("/add/new-admin", authenticate, authorized("Admin"), newadmin);
router.get("/admin/stats", authenticate, authorized("Admin"), getAdminStats);

// User management routes
router.put("/promote/:userId", authenticate, authorized("Admin"), promoteToAdmin);
router.put("/dismiss/:userId", authenticate, authorized("Admin"), dismissAdmin);
router.delete("/delete/:userId", authenticate, authorized("Admin"), deleteUser);

// User routes
router.get("/stats", authenticate, getUserStats);
router.get("/borrowed-books", authenticate, borrowedbooks);
router.get("/profile", authenticate, getUserProfile);
router.put("/profile/update", authenticate, updateUserProfile);

export default router;
