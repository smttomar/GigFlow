import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post("/auth/register", { name, email, password });
            navigate("/login");
        } catch (err) {
            alert("Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleRegister} className="p-6 max-w-md mx-auto">
            <h2 className="text-xl mb-4">Register</h2>

            <input
                className="border p-2 w-full mb-2"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <input
                type="email"
                className="border p-2 w-full mb-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                type="password"
                className="border p-2 w-full mb-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 w-full disabled:opacity-50"
            >
                {loading ? "Registering..." : "Register"}
            </button>
        </form>
    );
}
