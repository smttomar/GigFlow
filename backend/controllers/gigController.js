import Gig from "../models/Gig.js";

export const createGig = async (req, res) => {
    try {
        const { title, description, budget } = req.body;

        const gig = await Gig.create({
            title,
            description,
            budget,
            ownerId: req.userId,
        });

        res.status(201).json(gig);
    } catch (error) {
        res.status(500).json({ message: "Failed to create gig" });
    }
};

export const getGigs = async (req, res) => {
    try {
        const search = req.query.search || "";

        const gigs = await Gig.find({
            status: "open",
            title: { $regex: search, $options: "i" },
        });

        res.json(gigs);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch gigs" });
    }
};
