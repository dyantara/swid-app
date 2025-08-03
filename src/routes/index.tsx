import { useRoutes } from "react-router-dom";
import { dashboardRoutes } from "./dashboard.routes";
import { authRoutes } from "./auth.routes";
import { webRoutes } from "./website.routes";

export default function AppRoutes() {
    const routes = [dashboardRoutes, authRoutes, webRoutes];

    return useRoutes(routes);
}
