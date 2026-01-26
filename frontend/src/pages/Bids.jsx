import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Bids() {
    const { gigId } = useParams();

    const [bids, setBids] = useState([]);
    const [message, setMessage] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");

    const [gigOwnerId, setGigOwnerId] = useState(null);

    const isOwner =
        gigOwnerId && userId && gigOwnerId.toString() === userId.toString();

    useEffect(() => {
        api.get(`/gigs/${gigId}`)
            .then((res) => setGigOwnerId(res.data.ownerId))
            .catch(() => {});
    }, [gigId]);

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
        toast.success("Bid submitted successfully");
        setMessage("");
        setPrice("");
        navigate("/");
    };

    const hire = async (bidId) => {
        await api.patch(`/bids/${bidId}/hire`);
        const res = await api.get(`/bids/${gigId}`);
        setBids(res.data);
        toast.success("Freelancer Hired");
    };

    const statusColor = (status) => {
        if (status === "hired") return "bg-green-100 text-green-700";
        if (status === "rejected") return "bg-red-100 text-red-700";
        return "bg-yellow-100 text-yellow-700";
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Bids</h2>
                <p className="text-gray-500 mt-1">
                    Review offers or submit your proposal
                </p>
            </div>

            {!isOwner && (
                <form
                    onSubmit={submitBid}
                    className="bg-white rounded-2xl shadow-md p-6 mb-10"
                >
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Submit Your Bid
                    </h3>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Message
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Explain why you're a good fit for this project..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 resize-none
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Your Price (₹)
                        </label>
                        <input
                            type="number"
                            min="1"
                            placeholder="Enter your bid amount"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg
                   font-medium hover:bg-blue-700 transition
                   active:scale-[0.98]"
                    >
                        Submit Bid
                    </button>
                </form>
            )}

            <div className="space-y-4">
                {isOwner && bids.length === 0 && (
                    <p className="text-gray-500 text-center py-6">
                        No bids submitted yet.
                    </p>
                )}

                {bids.map((bid) => (
                    <div
                        key={bid._id}
                        className="bg-white rounded-2xl shadow-sm p-5
                   flex flex-col sm:flex-row sm:items-center
                   sm:justify-between gap-4"
                    >
                        <div>
                            <p className="font-semibold text-gray-800">
                                {bid.freelancerId?.name}
                            </p>

                            <p className="text-gray-600 text-sm mt-1 mb-3 max-w-xl">
                                {bid.message}
                            </p>

                            <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                                    bid.status,
                                )}`}
                            >
                                {bid.status}
                            </span>
                        </div>

                        <div className="text-right">
                            <p className="font-semibold text-lg text-gray-800">
                                ₹ {bid.price}
                            </p>

                            {isOwner && bid.status === "pending" && (
                                <button
                                    onClick={() => hire(bid._id)}
                                    className="mt-2 bg-green-600 text-white px-4 py-1.5 rounded-lg
                         text-sm font-medium hover:bg-green-700 transition
                         active:scale-[0.98]"
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
