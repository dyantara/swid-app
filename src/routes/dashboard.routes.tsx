import type { RouteObject } from "react-router-dom";
import DashboardPage from "@/pages/dashboard/page";
import LayoutDashboard from "@/components/layout/layout-dashboard";
import DashboardStories from "@/pages/dashboard/story/DashboardStories";
import DashboardNews from "@/pages/dashboard/news/DashboardNews";
import AddNewsPage from "@/pages/dashboard/news/AddNewsPage";
import EditNewsPage from "@/pages/dashboard/news/EditNewsPage";

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
        },
        {
            path: "news",
            element: <DashboardNews />,
        },
        {
            path: "news/add-news",
            element: <AddNewsPage />,
        },
        {
            path: "news/edit/:slug",
            element: <EditNewsPage />,
        },
    ],
};
