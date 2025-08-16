import { useState, useEffect } from "react";
import { Bell, Menu as MenuIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, Link, useNavigate } from "react-router-dom";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Story", href: "/story" },
    { name: "News", href: "/news" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
];

// Fungsi decode JWT tanpa library
const decodeToken = (token: string) => {
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;
        const decodedPayload = atob(parts[1]);
        return JSON.parse(decodedPayload);
    } catch (err) {
        console.error("Failed to decode token", err);
        return null;
    }
};

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    // Ambil token dari localStorage dan decode role
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);

        if (storedToken) {
            const payload = decodeToken(storedToken);
            setRole(payload?.role || null);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setRole(null);
        navigate("/login");
    };

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`transition-all duration-300 z-50 w-full ${
                scrolled
                    ? "fixed top-0 bg-white/70 backdrop-blur-md shadow"
                    : "absolute bg-transparent"
            }`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Left */}
                    <div className="flex items-center">
                        <img src="/assets/logo-swid.png" alt="SWID" className="h-8 w-auto" />
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-6">
                                {navigation.map((item) => {
                                    const isActive = location.pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={`text-sm font-medium ${
                                                isActive
                                                    ? "text-black border-b-2 border-black"
                                                    : "text-black hover:border-b-2 hover:border-black"
                                            }`}
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-2">
                        {token ? (
                            <>
                                <button className="p-1 rounded-full text-gray-400">
                                    <Bell className="size-6" />
                                </button>

                                <div className="relative">
                                    <button
                                        onClick={() => setProfileOpen(!profileOpen)}
                                        className="flex rounded-full"
                                    >
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                                            alt="User"
                                        />
                                    </button>

                                    {profileOpen && (
                                        <div className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                                            {/* Menu Dashboard hanya untuk admin/moderator */}
                                            {(role === "admin" || role === "moderator") && (
                                                <Link
                                                    to="/dashboard"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    Dashboard
                                                </Link>
                                            )}
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Your Profile
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Sign out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <Button
                                className="bg-primary-0 hover:bg-primary-100"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </Button>
                        )}

                        {/* Mobile menu button */}
                        <div className="sm:hidden">
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                            >
                                {mobileOpen ? (
                                    <X className="size-6" />
                                ) : (
                                    <MenuIcon className="size-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="sm:hidden px-2 pb-3 pt-2 space-y-1">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`block rounded-md px-3 py-2 text-base font-medium ${
                                    isActive
                                        ? "bg-gray-900 text-white"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
