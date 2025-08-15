import * as React from "react";
import {
    GalleryVerticalEnd,
    LayoutDashboard,
    BookText,
    FileText,
    Users,
    Settings,
    MessageCircle,
} from "lucide-react";

import { NavMain } from "@/components/layout/sidebar/nav-main";
import { NavUser } from "@/components/layout/sidebar/nav-user";
import { TeamSwitcher } from "@/components/layout/sidebar/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
    user: {
        name: "SWID",
        email: "admin@swid.co.id",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Admin SWID",
            logo: GalleryVerticalEnd,
            plan: "",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Story",
            url: "#",
            icon: BookText,
            items: [
                {
                    title: "Story Data",
                    url: "/dashboard/story",
                },
                {
                    title: "Story Category",
                    url: "/dashboard/story-category",
                },
            ],
        },
        {
            title: "Artikel",
            url: "/dashboard/artikel",
            icon: FileText,
        },
        {
            title: "Chat",
            url: "/dashboard/chat",
            icon: MessageCircle,
        },
        {
            title: "Users",
            url: "/dashboard/users",
            icon: Users,
        },
        {
            title: "Settings",
            url: "/dashboard/settings",
            icon: Settings,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
