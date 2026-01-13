import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function Bids() {
    const { gigId } = useParams();

    const [bids, setBids] = useState([]);
    const [message, setMessage] = useState("");
    const [price, setPrice] = useState("");

    // ✅ Get logged-in userId from localStorage
    const userId = localStorage.getItem("userId");

    const [gigOwnerId, setGigOwnerId] = useState(null);

    // ✅ Owner check
    const isOwner =
        gigOwnerId && userId && gigOwnerId.toString() === userId.toString();

    // 🔹 Get gig owner
    useEffect(() => {
        api.get(`/gigs/${gigId}`)
            .then((res) => setGigOwnerId(res.data.ownerId))
            .catch(() => {});
    }, [gigId]);

    // 🔹 Fetch bids (OWNER ONLY)
    useEffect(() => {
        if (isOwner) {
            api.get(`/bids/${gigId}`)
                .then((res) => setBids(res.data))
                .catch(() => {});
        }
    }, [gigId, isOwner]);

    const submitBid = async (e) => {
        e.preventDefault();
        await api.post("/bids", { gigId, message, price });
        alert("Bid submitted successfully");
        setMessage("");
        setPrice("");
    };

    const hire = async (bidId) => {
        await api.patch(`/bids/${bidId}/hire`);
        const res = await api.get(`/bids/${gigId}`);
        setBids(res.data);
    };

    const statusColor = (status) => {
        if (status === "hired") return "bg-green-100 text-green-700";
        if (status === "rejected") return "bg-red-100 text-red-700";
        return "bg-yellow-100 text-yellow-700";
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Bids</h2>

            {/* Bid Form (Freelancer Only) */}
            {!isOwner && (
                <form
                    onSubmit={submitBid}
                    className="bg-white border rounded-lg p-6 mb-8 shadow-sm"
                >
                    <h3 className="text-lg font-semibold mb-4">
                        Submit Your Bid
                    </h3>

                    <textarea
                        className="border p-3 w-full mb-3 rounded"
                        placeholder="Write a short message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />

                    <input
                        type="number"
                        className="border p-3 w-full mb-4 rounded"
                        placeholder="Your price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />

                    <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                        Submit Bid
                    </button>
                </form>
            )}

            {/* Bids List (Client Only) */}
            <div className="space-y-4">
                {isOwner && bids.length === 0 && (
                    <p className="text-gray-500">No bids submitted yet.</p>
                )}

                {bids.map((bid) => (
                    <div
                        key={bid._id}
                        className="bg-white border rounded-lg p-5 shadow-sm flex justify-between items-center"
                    >
                        <div>
                            <p className="font-medium text-gray-800">
                                {bid.freelancerId?.name}
                            </p>
                            <p className="text-gray-600 text-sm mb-2">
                                {bid.message}
                            </p>

                            <span
                                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                                    bid.status
                                )}`}
                            >
                                {bid.status}
                            </span>
                        </div>

                        <div className="text-right">
                            <p className="font-semibold text-lg">
                                ₹ {bid.price}
                            </p>

                            {isOwner && bid.status === "pending" && (
                                <button
                                    onClick={() => hire(bid._id)}
                                    className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                                >
                                    Hire
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
