"use client";

import React from "react";
import { ChevronsUpDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type UserType = {
    name?: string | null;
    email?: string | null;
    avatar?: string | null;
    role?: string | null;
};

export function NavUser({ user: propUser }: { user?: UserType }) {
    const { isMobile } = useSidebar();
    const navigate = useNavigate();

    // Ambil user dari props jika ada, kalau nggak ada coba dari localStorage (safe parse)
    const user = React.useMemo<UserType | undefined>(() => {
        if (propUser) return propUser;
        try {
            const raw = localStorage.getItem("user");
            if (!raw) return undefined;
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === "object") return parsed as UserType;
        } catch (e) {
            // Jangan crash kalau JSON invalid
            // console.warn("Failed to parse user from localStorage:", e);
        }
        return undefined;
    }, [propUser]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
    };

    // Safe initial: kalau name undefined/empty -> fallback "U"
    const initial = user?.name && user.name.length > 0 ? user.name.charAt(0).toUpperCase() : "U";

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                {/* AvatarImage akan menerima undefined; AvatarFallback tampil jika image gagal */}
                                {user?.avatar ? (
                                    <AvatarImage src={user.avatar} alt={user?.name ?? "User"} />
                                ) : (
                                    <></>
                                )}
                                <AvatarFallback className="rounded-lg">{initial}</AvatarFallback>
                            </Avatar>

                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user?.name ?? "User"}</span>
                                <span className="truncate text-xs">{user?.email ?? ""}</span>
                            </div>

                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    {user?.avatar ? (
                                        <AvatarImage src={user.avatar} alt={user?.name ?? "User"} />
                                    ) : (
                                        <></>
                                    )}
                                    <AvatarFallback className="rounded-lg">
                                        {initial}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        {user?.name ?? "User"}
                                    </span>
                                    <span className="truncate text-xs">{user?.email ?? ""}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        {/* Logout with confirmation */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()} // cegah dropdown auto-close
                                    className="cursor-pointer"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Apakah Anda yakin ingin keluar dari akun ini?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleLogout}>
                                        Ya, Logout
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
