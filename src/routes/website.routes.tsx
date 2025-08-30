import LayoutWebsite from "@/components/layout/layout-website";
import ComingSoon from "@/pages/others/ComingSoon";
import AboutusPage from "@/pages/website/aboutus-page/AboutusPage";
import HomePage from "@/pages/website/home-page/HomePage";
import type { RouteObject } from "react-router-dom";
import NewsPage from "@/pages/website/news-page/NewsPage";
import StoryPage from "@/pages/website/story-page/StoryPage";
import StoryDetailPage from "@/pages/website/story-page/StoryDetailPage";
import NewsDetailPage from "@/pages/website/news-page/NewsDetailPage";


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
            element: <StoryPage />,
        },
        {
            path: "story/detail/:slug",
            element: <StoryDetailPage />,
        },
        {
            path: "news",
            element: <NewsPage />,
        },
        {
            path: "news/detail/:slug",
            element: <NewsDetailPage />,
        },
        {
            path: "contact-us",
            element: <ComingSoon />,
        },
        {
            path: "profile",
            element: <ComingSoon />,
        },
    ],
};
