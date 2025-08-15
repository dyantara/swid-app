import LayoutWebsite from "@/components/layout/layout-website";
import ComingSoon from "@/pages/others/ComingSoon";
import AboutusPage from "@/pages/website/aboutus-page/AboutusPage";
import HomePage from "@/pages/website/home-page/HomePage";
import type { RouteObject } from "react-router-dom";

export const webRoutes: RouteObject = {
    path: "/",
    element: <LayoutWebsite />,
    children: [
        {
            index: true,
            element: <HomePage />,
        },
        {
            path: "about-us",
            element: <AboutusPage />,
        },
        {
            path: "story",
            element: <ComingSoon />,
        },
        {
            path: "article",
            element: <ComingSoon />,
        },
        {
            path: "contact-us",
            element: <ComingSoon />,
        }
    ],
};
