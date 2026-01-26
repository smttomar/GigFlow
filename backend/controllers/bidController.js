import mongoose from "mongoose";
import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";

export const createBid = async (req, res) => {
    try {
        const { gigId, message, price } = req.body;

        const gig = await Gig.findById(gigId);
        if (!gig) {
            return res.status(404).json({ message: "Gig not found" });
        }

        if (gig.ownerId.toString() === req.userId) {
            return res
                .status(400)
                .json({ message: "You cannot bid on your own gig" });
        }

        const bid = await Bid.create({
            gigId,
            freelancerId: req.userId,
            message,
            price,
        });

        res.status(201).json(bid);
    } catch (error) {
        res.status(500).json({ message: "Failed to create bid" });
    }
};

export const getBidsByGig = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.gigId);

        if (!gig) {
            return res.status(404).json({ message: "Gig not found" });
        }

        if (gig.ownerId.toString() !== req.userId) {
            return res.status(403).json({ message: "Access denied" });
        }

        const bids = await Bid.find({ gigId: gig._id }).populate(
            "freelancerId",
            "name email",
        );

        res.json(bids);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch bids" });
    }
};

export const hireBid = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const bid = await Bid.findById(req.params.bidId).session(session);
        if (!bid) throw new Error("Bid not found");

        const gig = await Gig.findById(bid.gigId).session(session);
        if (!gig) throw new Error("Gig not found");

        if (gig.status === "assigned") {
            throw new Error("Gig already assigned");
        }

        gig.status = "assigned";
        await gig.save({ session });

        await Bid.updateOne({ _id: bid._id }, { status: "hired" }, { session });

        await Bid.updateMany(
            { gigId: gig._id, _id: { $ne: bid._id } },
            { status: "rejected" },
            { session },
        );

        await session.commitTransaction();
        res.json({ message: "Freelancer hired successfully" });
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({ message: error.message });
    } finally {
        session.endSession();
    }
};
