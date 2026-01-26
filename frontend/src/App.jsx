import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Gigs from "./pages/Gigs";
import CreateGig from "./pages/CreateGig";
import Bids from "./pages/Bids";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <BrowserRouter>
            <Toaster position="top-center" reverseOrder={false} />
            <Navbar />

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/create-gig"
                    element={
                        <ProtectedRoute>
                            <CreateGig />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Gigs />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/bids/:gigId"
                    element={
                        <ProtectedRoute>
                            <Bids />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
