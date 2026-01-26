import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Gigs() {
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/gigs")
            .then((res) => setGigs(res.data))
            .catch(() => toast.error("Failed to load gigs"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                        Available Gigs
                    </h2>
                    <p className="text-gray-500 mt-1">
                        Browse projects and start earning today
                    </p>
                </div>
            </div>

            {loading && (
                <p className="text-gray-500 text-center py-20">
                    Loading gigs...
                </p>
            )}

            {!loading && gigs.length === 0 && (
                <p className="text-gray-500 text-center py-20">
                    No gigs available right now.
                </p>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {gigs.map((gig) => (
                    <div
                        key={gig._id}
                        className="bg-white rounded-2xl shadow-sm
                   hover:shadow-lg transition
                   p-6 flex flex-col"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {gig.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {gig.description}
                        </p>

                        <div className="mt-auto flex items-center justify-between">
                            <span
                                className="inline-flex items-center gap-1
                           bg-green-100 text-green-700
                           px-3 py-1 rounded-full
                           text-sm font-medium"
                            >
                                ₹ {gig.budget}
                            </span>

                            <Link
                                to={`/bids/${gig._id}`}
                                className="text-blue-600 font-medium
                       hover:text-blue-700 transition"
                            >
                                View & Bid →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
