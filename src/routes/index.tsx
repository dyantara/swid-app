import { useRoutes } from "react-router-dom";
import { dashboardRoutes } from "./dashboard.routes";
import { authRoutes } from "./auth.routes";

export default function AppRoutes() {
    const routes = [dashboardRoutes, authRoutes];

    return useRoutes(routes);
}
