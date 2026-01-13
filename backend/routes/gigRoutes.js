import express from "express";
import { createGig, getGigs } from "../controllers/gigController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Gig from "../models/Gig.js";

const router = express.Router();

router.get("/", getGigs);
router.post("/", authMiddleware, createGig);
router.get("/:id", authMiddleware, async (req, res) => {
    const gig = await Gig.findById(req.params.id);
    res.json(gig);
});

export default router;
