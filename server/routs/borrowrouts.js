// Corrected route configuration to match your existing setup 

import {
  returnborrowedbook,
  getborrowedbooksforadmin,
  recordborrowedbooks,
  borrowedbooks,
  deleteBorrowRecords,
  deleteAllBorrowRecords
} from "../controllers/borrowcomtrollers.js";
import { authenticate, authorized } from "../middlewares/authmiddleware.js";
import express from "express";

const router = express.Router();

// Corrected middleware order and endpoint names
router.post("/record-borrowed-books/:id", authenticate, authorized("Admin", "User"), recordborrowedbooks);
router.get("/borrowedbooksbyusers", authenticate, authorized("Admin"), getborrowedbooksforadmin);
router.get("/myborrowedbooks", authenticate, borrowedbooks); // Changed to match frontend endpoint
router.get("/user/borrowed-books", authenticate, borrowedbooks); // Added alias for frontend endpoint
router.put("/returnborrowedbook/:bookid", authenticate, authorized("Admin", "User"), returnborrowedbook);

// Add new routes for deleting borrow records
router.delete("/delete-records", authenticate, authorized("Admin"), deleteBorrowRecords);
router.delete("/delete-all-records", authenticate, authorized("Admin"), deleteAllBorrowRecords);

export default router;
