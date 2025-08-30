import * as React from "react";
import { LayoutDashboard, BookText, ExternalLink } from "lucide-react";

import { NavMain } from "@/components/layout/sidebar/nav-main";
import { NavUser } from "@/components/layout/sidebar/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

type User = {
    name: string;
    email: string;
    avatar: string;
    role?: string;
};


type NavItem = {
    title: string;
    url: string;
    icon?: any;
    items?: { title: string; url: string }[];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [user, setUser] = React.useState<User | null>(null);
    // const [teams, setTeams] = React.useState<Team[]>([]);
    const [navMain, setNavMain] = React.useState<NavItem[]>([]);

    React.useEffect(() => {
        // Ambil data user dari localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser: User = JSON.parse(storedUser);
            setUser(parsedUser);

            // Set team default dari role/admin
            if (parsedUser.role === "admin" || parsedUser.role === "moderator") {
                // setTeams([
                //     {
                //         name: "Admin SWID",
                //         logo: GalleryVerticalEnd,
                //     },
                // ]);

                setNavMain([
                    {
                        title: "Dashboard",
                        url: "/dashboard",
                        icon: LayoutDashboard,
                    },
                    {
                        title: "Story",
                        url: "/dashboard/story",
                        icon: BookText,
                    },
                    {
                        title: "News",
                        url: "/dashboard/news",
                        icon: LayoutDashboard,
                    },
                    // {
                    //     title: "Story",
                    //     url: "#",
                    //     icon: BookText,
                    //     items: [
                    //         { title: "Story Data", url: "/dashboard/story" },
                    //         { title: "Story Category", url: "/dashboard/story-category" },
                    //     ],
                    // },
                ]);
            } else {
                // User biasa tidak perlu team & nav khusus
                // setTeams([]);
                setNavMain([]);
            }
        }
    }, []);

    if (!user) return null; // bisa diganti loading skeleton

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <div className="px-4 py-2 ">
                    <img src="/assets/logo-swid.png" className="w-24" alt="" />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain} />
            </SidebarContent>
            <SidebarFooter>
                <Separator />
                <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                    <ExternalLink className="w-4 h-4" /> Go to Website
                </a>
                <Separator />

                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
