import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link
                    to="/"
                    className="text-2xl font-bold text-blue-600 tracking-tight"
                >
                    GigFlow
                </Link>

                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="text-gray-700 font-medium hover:text-blue-600 transition"
                    >
                        Gigs
                    </Link>

                    {token && role === "client" && (
                        <Link
                            to="/create-gig"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg
                       font-medium hover:bg-blue-700 transition
                       active:scale-[0.98]"
                        >
                            Post Gig
                        </Link>
                    )}
                    {token ? (
                        <button
                            onClick={logout}
                            className="px-4 py-2 rounded-lg
                       border border-red-500 text-red-500
                       hover:bg-red-500 hover:text-white transition
                       active:scale-[0.98]"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 rounded-lg
                       border border-blue-500 text-blue-600
                       hover:bg-blue-500 hover:text-white transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="px-4 py-2 rounded-lg bg-green-600 text-white
                       font-medium hover:bg-green-700 transition
                       active:scale-[0.98]"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
