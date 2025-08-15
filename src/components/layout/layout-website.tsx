import { Outlet } from "react-router-dom";
import Navbar from "./layout-component/navbar";
import Footer from "./layout-component/footer";

function LayoutWebsite() {
    return (
        <div className="flex flex-col">
            <Navbar />
            <div className="flex flex-1 flex-col gap-4 pt-0 mt-10 mb-10 p-8">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default LayoutWebsite;
