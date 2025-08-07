import LayoutWebsite from "@/components/layout/layout-website";
import ComingSoon from "@/pages/others/ComingSoon";
import HomePage from "@/pages/website/home-page/HomePage";
import type { RouteObject } from "react-router-dom";

export const webRoutes: RouteObject = {
    path: "/",
    element: <LayoutWebsite />,
    children: [
        {
            index: true,
            element: <ComingSoon />,
        },
        {
            path: "home",
            element: <HomePage />,
        },
    ],
};
