import { Facebook, Instagram, Github, Youtube, X } from "lucide-react";

function Footer() {
    return (
        <footer className="bg-white text-black shadow-[0_-4px_12px_rgba(0,0,0,0.05)] rounded-t-4xl">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="xl:grid xl:grid-cols-5 xl:gap-8">
                    {/* Logo & Deskripsi */}
                    <div className="space-y-4">
                        <img src="/assets/logo-swid.png" alt="SWID Logo" className="h-12" />
                        <p className="text-sm text-gray-400">
                            Making the world a better place through constructing elegant
                            hierarchies.
                        </p>
                        {/* Social Icons */}
                        <div className="flex space-x-4">
                            <a href="#">
                                <Facebook className="h-5 w-5 text-black hover:text-blue-600" />
                            </a>
                            <a href="#">
                                <Instagram className="h-5 w-5 text-black hover:text-pink-600" />
                            </a>
                            <a href="#">
                                <X className="h-5 w-5 text-black hover:text-gray-800" />
                            </a>
                            <a href="#">
                                <Github className="h-5 w-5 text-black hover:text-gray-900" />
                            </a>
                            <a href="#">
                                <Youtube className="h-5 w-5 text-black hover:text-red-600" />
                            </a>
                        </div>
                    </div>

                    {/* Link Groups */}
                    <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4 xl:col-span-4 xl:mt-0">
                        <div>
                            <h3 className="text-sm font-semibold text-black">Solutions</h3>
                            <ul className="mt-2 space-y-2 text-sm text-gray-400">
                                <li>
                                    <a href="#">Marketing</a>
                                </li>
                                <li>
                                    <a href="#">Analytics</a>
                                </li>
                                <li>
                                    <a href="#">Automation</a>
                                </li>
                                <li>
                                    <a href="#">Commerce</a>
                                </li>
                                <li>
                                    <a href="#">Insights</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-black">Support</h3>
                            <ul className="mt-2 space-y-2 text-sm text-gray-400">
                                <li>
                                    <a href="#">Submit ticket</a>
                                </li>
                                <li>
                                    <a href="#">Documentation</a>
                                </li>
                                <li>
                                    <a href="#">Guides</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-black">Company</h3>
                            <ul className="mt-2 space-y-2 text-sm text-gray-400">
                                <li>
                                    <a href="#">About</a>
                                </li>
                                <li>
                                    <a href="#">Blog</a>
                                </li>
                                <li>
                                    <a href="#">Jobs</a>
                                </li>
                                <li>
                                    <a href="#">Press</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-black">Legal</h3>
                            <ul className="mt-2 space-y-2 text-sm text-gray-400">
                                <li>
                                    <a href="#">Terms of service</a>
                                </li>
                                <li>
                                    <a href="#">Privacy policy</a>
                                </li>
                                <li>
                                    <a href="#">License</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-200 pt-4 text-center text-sm text-black">
                    © {new Date().getFullYear()} SWID, Inc. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
