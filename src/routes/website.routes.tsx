import ComingSoon from "@/pages/others/ComingSoon";
import type { RouteObject } from "react-router-dom";

export const webRoutes: RouteObject = {
    path: "/",
    children: [
        {
            index: true,
            element: <ComingSoon />,
        },
    ],
};
