import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Gigs() {
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/gigs")
            .then((res) => setGigs(res.data))
            .catch(() => alert("Failed to load gigs"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Available Gigs
            </h2>

            {loading && (
                <p className="text-gray-500 text-center mt-20">
                    Loading gigs...
                </p>
            )}

            {!loading && gigs.length === 0 && (
                <p className="text-gray-500 text-center mt-20">
                    No gigs available right now.
                </p>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {gigs.map((gig) => (
                    <div
                        key={gig._id}
                        className="bg-white border rounded-lg shadow-sm hover:shadow-lg transition p-6 flex flex-col justify-between"
                    >
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {gig.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {gig.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                ₹ {gig.budget}
                            </span>

                            <Link
                                to={`/bids/${gig._id}`}
                                className="text-blue-600 font-medium hover:underline"
                            >
                                View / Bid →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
