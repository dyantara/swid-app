import type { RouteObject } from "react-router-dom";
import DashboardPage from "@/pages/dashboard/page";
import LayoutDashboard from "@/components/layout/layout-dashboard";
import DashboardStories from "@/pages/dashboard/story/DashboardStories";

export const dashboardRoutes: RouteObject = {
    path: "/dashboard",
    element: <LayoutDashboard />,
    children: [
        {
            index: true,
            element: <DashboardPage />,
        },
        {
            path: "story",
            element: <DashboardStories />,
        }
    ],
};
