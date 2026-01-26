import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreateGig() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [budget, setBudget] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post("/gigs", {
                title,
                description,
                budget,
            });
            navigate("/");
            toast.success("Gig Created");
        } catch (err) {
            toast.error("Failed to create gig");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8"
        >
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Post a Gig
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    Tell freelancers what you need done
                </p>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gig Title
                </label>
                <input
                    type="text"
                    placeholder="Build a responsive website"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2
                 focus:outline-none focus:ring-2 focus:ring-green-500
                 focus:border-green-500 transition"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    rows={4}
                    placeholder="Describe your project requirements, deadline, and expectations..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 resize-none
                 focus:outline-none focus:ring-2 focus:ring-green-500
                 focus:border-green-500 transition"
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget (₹)
                </label>
                <input
                    type="number"
                    min="1"
                    placeholder="5000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2
                 focus:outline-none focus:ring-2 focus:ring-green-500
                 focus:border-green-500 transition"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-2.5 rounded-lg
               font-medium hover:bg-green-700 transition
               disabled:opacity-50 disabled:cursor-not-allowed
               active:scale-[0.98]"
            >
                {loading ? "Creating gig..." : "Create Gig"}
            </button>
        </form>
    );
}
