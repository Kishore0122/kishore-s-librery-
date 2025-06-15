import express from "express";
import {
  createBorrowRequest,
  getPendingRequests,
  approveBorrowRequest,
  rejectBorrowRequest,
  getUserBorrowRequests
} from "../controllers/borrowrequestcontroller.js";
import { authenticate, authorized } from "../middlewares/authmiddleware.js";

const router = express.Router();

// Routes for borrow requests
router.post("/request/:id", authenticate, createBorrowRequest);
router.get("/requests", authenticate, authorized("Admin"), getPendingRequests);
router.post("/approve/:id", authenticate, authorized("Admin"), approveBorrowRequest);
router.post("/reject/:id", authenticate, authorized("Admin"), rejectBorrowRequest);
router.get("/my-requests", authenticate, getUserBorrowRequests);

export default router; 