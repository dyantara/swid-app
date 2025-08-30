import { Outlet } from "react-router-dom";
import Navbar from "./layout-component/navbar";
import Footer from "./layout-component/footer";

function LayoutWebsite() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            {/* Wrapper konten */}
            <main className="flex-1 container mt-8 mx-auto px-8 md:px-16 py-12">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default LayoutWebsite;
