import React from 'react'
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";


const Navber = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [user, setUser] = useState(null)
    const handleLogout = () => {
        fetch("http://localhost:3000/auth/logout", {
            method: "GET",
            credentials: "include"  // ✅ Include cookies for session clearing
        })
            .then((res) => res.json())
            .then(() => {
                // setUser(null);
                window.location.href = "/";  // ✅ Redirect after logout
            })
            .catch((err) => console.error("Logout failed:", err));
    };

    useEffect(() => {
        fetch("http://localhost:3000/auth/user", { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
                setUser(data)

            })
            .catch((err) => console.error("Error fetching user:", err));
    }, []);


    return (
        <>
            <div className="relative z-50">
                {/* Header */}
                <div className="w-full flex justify-between items-center px-6 md:px-10 py-4 bg-black/20 backdrop-blur-md">
                    <h3 className="text-xl md:text-2xl font-bold text-white">Askify</h3>

                    <div className="flex items-center">
                        <div
                            onClick={() => setIsVisible(!isVisible)}
                            className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-tr from-red-500 to-pink-500 rounded-full cursor-pointer flex items-center justify-center text-white font-bold text-sm hover:scale-105 transition"
                        >
                            {user?.displayName?.charAt(0) || "A"}
                        </div>
                    </div>
                </div>

                {/* Dropdown */}
                <div
                    className={`absolute right-6 top-20 w-80 max-w-sm p-6 bg-white/10 backdrop-blur-xl text-white rounded-xl shadow-xl border border-white/20 transition-all duration-300 ${isVisible ? "block" : "hidden"
                        }`}
                >
                    <div
                        onClick={() => setIsVisible(false)}
                        className="absolute top-3 right-3 p-2 bg-white/20 rounded-full cursor-pointer hover:bg-white/30 transition"
                    >
                        <IoClose size={20} />
                    </div>

                    {user ? (
                        <div className="flex flex-col items-center gap-4 mt-4">
                            <img
                                src={user.photos[0].value}
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover border-4 border-white/30"
                            />
                            <h2 className="text-lg font-semibold">{user.displayName}</h2>
                            <p className="text-sm text-white/80">{user.emails[0].value}</p>

                            <button
                                onClick={handleLogout}
                                className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 transition rounded-full text-sm font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <p className="text-center py-8">Loading user info...</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navber

