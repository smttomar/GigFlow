import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

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
        } catch (err) {
            alert("Failed to create gig");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
            <h2 className="text-xl mb-4">Post a Gig</h2>

            <input
                className="border p-2 w-full mb-2"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <textarea
                className="border p-2 w-full mb-2"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />

            <input
                type="number"
                className="border p-2 w-full mb-2"
                placeholder="Budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
            />

            <button
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 w-full disabled:opacity-50"
            >
                {loading ? "Creating..." : "Create Gig"}
            </button>
        </form>
    );
}
