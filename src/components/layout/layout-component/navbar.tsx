import { useState } from "react";
import { Bell, Menu as MenuIcon, X } from "lucide-react";

const navigation = [
    { name: "Home", href: "#", current: true },
    { name: "Story", href: "#", current: false },
    { name: "Article", href: "#", current: false },
    { name: "About Us", href: "#", current: false },
];

function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    return (
        <nav className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Left */}
                    <div className="flex items-center">
                        <img src="/assets/logo-swid.png" alt="SWID" className="h-8 w-auto" />
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={
                                            item.current
                                                ? "text-black text-sm font-medium border-b-2 border-black"
                                                : "text-black text-sm font-medium hover:border-b-2 hover:border-black"
                                        }
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-2">
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
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Your Profile
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Settings
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Sign out
                                    </a>
                                </div>
                            )}
                        </div>
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

            {mobileOpen && (
                <div className="sm:hidden px-2 pb-3 pt-2 space-y-1">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={
                                item.current
                                    ? "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                                    : "text-gray-600 hover:bg-gray-100 block rounded-md px-3 py-2 text-base font-medium"
                            }
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
