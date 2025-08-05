import LoginPage from "@/pages/auth/login/page";
import type { RouteObject } from "react-router-dom";

export const authRoutes: RouteObject = {
    path: "/login",
    children: [
        {
            index: true,
            element: <LoginPage />,
        },
    ],
};
