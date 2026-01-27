import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const Spinner = () => (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
    );

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post("/auth/login", { email, password });

            const { token, userId, role } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("role", role);

            navigate("/");
            toast.success("Wellcome Back");
        } catch (error) {
            toast.error("Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleLogin}
            className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8"
        >
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Welcome Back
                </h2>
                <p className="text-sm text-gray-500 mt-1">Login to continue</p>
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
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 focus:border-blue-500 transition"
                />
            </div>

            <div className="mb-6">
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
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 focus:border-blue-500 transition"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2
                 text-sm text-gray-500 hover:text-gray-700
                 focus:outline-none"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg
             font-medium flex items-center justify-center gap-2
             hover:bg-blue-700 transition
             disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <Spinner />
                        Logging in...
                    </>
                ) : (
                    "Login"
                )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
                Don’t have an account?{" "}
                <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                    <Link to="/register">Sign up</Link>
                </span>
            </p>
        </form>
    );
}
