import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post("/auth/register", { name, email, password, role });
            navigate("/login");
        } catch (err) {
            alert("Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleRegister}
            className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8"
        >
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Create Account
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    Join us in just a few seconds
                </p>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                </label>
                <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2
                 focus:outline-none focus:ring-2 focus:ring-green-500
                 focus:border-green-500 transition"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2
                 focus:outline-none focus:ring-2 focus:ring-green-500
                 focus:border-green-500 transition"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-12
                   focus:outline-none focus:ring-2 focus:ring-green-500
                   focus:border-green-500 transition"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2
                   text-sm text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                </label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2
                 bg-white focus:outline-none focus:ring-2
                 focus:ring-green-500 focus:border-green-500 transition"
                >
                    <option value="">Select your role</option>
                    <option value="client">Client</option>
                    <option value="freelancer">Freelancer</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-2.5 rounded-lg
               font-medium hover:bg-green-700 transition
               disabled:opacity-50 disabled:cursor-not-allowed
               active:scale-[0.98]"
            >
                {loading ? "Creating account..." : "Register"}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account?{" "}
                <span className="text-green-600 font-medium cursor-pointer hover:underline">
                    <Link to="/login">Login</Link>
                </span>
            </p>
        </form>
    );
}
