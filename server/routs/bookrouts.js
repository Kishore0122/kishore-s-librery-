import {authenticate, authorized} from "../middlewares/authmiddleware.js"
import { addbook, deletebook, getallbooks } from "../controllers/bookcontrollers.js"  
import express from 'express';

const router = express.Router();

// Fix middleware order - authenticate first, then authorize
router.post("/admin/addbook", authenticate, authorized("Admin"), addbook);
router.get("/all", getallbooks); // Remove authenticate to allow public access to book list
router.delete("/deletebook/:id", authenticate, authorized("Admin"), deletebook);

export default router;
