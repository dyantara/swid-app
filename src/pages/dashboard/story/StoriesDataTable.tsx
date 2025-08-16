"use client";

import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
} from "@tanstack/react-table";
import type { SortingState } from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStories } from "@/hooks/useStories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Link } from "react-router-dom";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type Story = {
    _id: string;
    title: string;
    category?: { _id: string; name: string };
    status: "pending" | "approved" | "rejected";
    createdAt: string;
};

const ActionsCell = ({ row }: { row: any }) => {
    const queryClient = useQueryClient();
    const [confirmType, setConfirmType] = React.useState<null | "delete" | "approve" | "reject">(
        null
    );

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/stories/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["stories"] });
        },
    });

    const statusMutation = useMutation({
        mutationFn: async ({ id, status }: { id: string; status: "approved" | "rejected" }) => {
            console.log("PATCH request to:", `/stories/${id}/status`);
            console.log("Payload:", { status });
            const response = await api.patch(`/stories/${id}/status`, { status });
            console.log("Response:", response.data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["stories"] });
        },
        onError: (err: any) => {
            console.error("Status mutation error:", err.response ?? err);
        },
    });

    const handleConfirm = () => {
        const id = row.original._id;
        if (confirmType === "delete") {
            deleteMutation.mutate(id);
        } else if (confirmType === "approve" || confirmType === "reject") {
            statusMutation.mutate({
                id,
                status: confirmType === "approve" ? "approved" : "rejected",
            });
        }
        setConfirmType(null); // tutup modal
    };

    return (
        <>
            <div className="flex gap-2">
                <Link to={`/dashboard/stories/edit/${row.original._id}`}>
                    <Button variant="outline" size="sm">
                        Edit
                    </Button>
                </Link>
                {row.original.status === "pending" && (
                    <>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setConfirmType("approve")}
                            disabled={statusMutation.isPending}
                        >
                            Approve
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setConfirmType("reject")}
                            disabled={statusMutation.isPending}
                        >
                            Reject
                        </Button>
                    </>
                )}
                <Button
                    variant="destructive"
                    size="sm"
                    disabled={deleteMutation.isPending}
                    onClick={() => setConfirmType("delete")}
                >
                    {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
                </Button>
            </div>

            {/* Modal Konfirmasi */}
            <Dialog open={!!confirmType} onOpenChange={() => setConfirmType(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {confirmType === "delete"
                                ? "Hapus Story?"
                                : confirmType === "approve"
                                  ? "Approve Story?"
                                  : "Reject Story?"}
                        </DialogTitle>
                        <DialogDescription>
                            {confirmType === "delete"
                                ? "Apakah kamu yakin ingin menghapus story ini? Tindakan ini tidak bisa dibatalkan."
                                : confirmType === "approve"
                                  ? "Apakah kamu yakin ingin menyetujui story ini?"
                                  : "Apakah kamu yakin ingin menolak story ini?"}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setConfirmType(null)}>
                            Batal
                        </Button>
                        <Button
                            variant={confirmType === "delete" ? "destructive" : "default"}
                            onClick={handleConfirm}
                            disabled={deleteMutation.isPending || statusMutation.isPending}
                        >
                            {deleteMutation.isPending || statusMutation.isPending
                                ? "Memproses..."
                                : confirmType === "delete"
                                  ? "Hapus"
                                  : confirmType === "approve"
                                    ? "Approve"
                                    : "Reject"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

const columns: ColumnDef<Story, any>[] = [
    {
        accessorKey: "title",
        header: "Judul",
        cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
        accessorKey: "category.name",
        header: "Kategori",
        cell: ({ row }) => row.original.category?.name ?? "-",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const color =
                status === "approved"
                    ? "text-green-600"
                    : status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600";
            return <span className={color}>{status}</span>;
        },
    },
    {
        accessorKey: "createdAt",
        header: "Tanggal",
        cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString("id-ID"),
    },
    {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => <ActionsCell row={row} />,
    },
];



export function StoriesDataTable() {
    const { data, isLoading, isError, error } = useStories();
    const stories = data?.data ?? [];

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = React.useState("");

    const table = useReactTable({
        data: stories,
        columns,
        state: { sorting, globalFilter },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="space-y-4">
            {/* 🔍 Search */}
            <div>
                <Input
                    placeholder="Cari story..."
                    value={globalFilter ?? ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            <div className="rounded-md border bg-white shadow">
                {/* 📋 Table */}
                <Table>
                    <TableHeader className="bg-gray-100">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="cursor-pointer select-none"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <div className="flex items-center gap-1">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {header.column.getIsSorted() === "asc" ? (
                                                <ArrowUp size={14} />
                                            ) : header.column.getIsSorted() === "desc" ? (
                                                <ArrowDown size={14} />
                                            ) : (
                                                <ArrowUpDown size={14} className="text-gray-400" />
                                            )}
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center py-6">
                                    Tidak ada story
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* 📑 Pagination */}
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                    Halaman {table.getState().pagination.pageIndex + 1} dari {table.getPageCount()}
                </span>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
