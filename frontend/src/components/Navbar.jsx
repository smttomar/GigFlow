import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
    };

    return (
        <nav className="bg-gray-900 text-white px-8 py-4 flex items-center justify-between shadow-md">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-blue-400">
                GigFlow
            </Link>

            {/* Links */}
            <div className="flex items-center gap-4">
                <Link to="/" className="hover:text-blue-400 transition">
                    Gigs
                </Link>

                {token ? (
                    <>
                        <Link
                            to="/create-gig"
                            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Post Gig
                        </Link>

                        <button
                            onClick={logout}
                            className="border border-red-500 text-red-400 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="border border-blue-500 px-4 py-2 rounded hover:bg-blue-500 transition"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
