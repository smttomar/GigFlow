import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", { email, password });

            const { token, userId } = res.data;

            // ✅ store auth data
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);

            // ✅ redirect to gigs page
            navigate("/");
        } catch (error) {
            alert("Login failed");
        }
    };

    return (
        <form onSubmit={handleLogin} className="p-6 max-w-md mx-auto">
            <h2 className="text-xl mb-4">Login</h2>

            <input
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

            <button className="bg-blue-600 text-white px-4 py-2 w-full">
                Login
            </button>
        </form>
    );
}
