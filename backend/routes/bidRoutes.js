import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    createBid,
    getBidsByGig,
    hireBid,
} from "../controllers/bidController.js";

const router = express.Router();

router.post("/", authMiddleware, createBid);
router.get("/:gigId", authMiddleware, getBidsByGig);
router.patch("/:bidId/hire", authMiddleware, hireBid);

export default router;
