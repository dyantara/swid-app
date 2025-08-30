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
import { useCategories, type Category } from "@/hooks/useCategories";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useDeleteArticle, useArticles, type Article } from "@/hooks/useArticles";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";


// ============ Actions Cell ============
const ActionsCell = ({ row }: { row: any }) => {
    const navigate = useNavigate();

    const deleteArticle = useDeleteArticle();
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleDelete = () => {
        const id = row.original._id;
        deleteArticle.mutate(id, {
            onSuccess: () => setOpenDelete(false),
        });
    };

    return (
        <>
            <div className="flex gap-2">
                {/* ✅ Tombol Edit */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/dashboard/news/edit/${row.original.slug}`)}
                >
                    Edit
                </Button>

                {/* ✅ Tombol Delete */}
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setOpenDelete(true)}
                    disabled={deleteArticle.isPending}
                >
                    Delete
                </Button>
            </div>

            {/* Konfirmasi Delete */}
            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Hapus Artikel?</DialogTitle>
                        <DialogDescription>
                            Artikel ini akan dihapus permanen. Yakin lanjut?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpenDelete(false)}>
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleteArticle.isPending}
                        >
                            {deleteArticle.isPending ? "Menghapus..." : "Hapus"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

// ============ Columns ============
const columns: ColumnDef<Article, any>[] = [
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
                status === "published"
                    ? "text-green-600"
                    : status === "draft"
                      ? "text-yellow-600"
                      : "text-gray-500";
            return <span className={color}>{status}</span>;
        },
    },
    {
        accessorKey: "createdAt",
        header: "Tanggal",
        cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString("id-ID"),
    },
    { id: "actions", header: "Aksi", cell: ({ row }) => <ActionsCell row={row} /> },
];

// ============ Table Component ============
export function NewsDataTable() {
    const { data, isLoading, isError, error } = useArticles();
    const { data: categories, isLoading: catLoading } = useCategories();

    const articles = data ?? [];

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [categoryFilter, setCategoryFilter] = React.useState<string>("all");

    // ✅ Filter artikel berdasarkan title & category
    const filteredArticles = React.useMemo(() => {
        return articles.filter((article: Article) => {
            const matchTitle = article.title.toLowerCase().includes(searchQuery.toLowerCase());

            const matchCategory =
                categoryFilter === "all" || article.category?._id === categoryFilter;

            return matchTitle && matchCategory;
        });
    }, [articles, searchQuery, categoryFilter]);

    const table = useReactTable({
        data: filteredArticles,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    if (isLoading || catLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="space-y-4">
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Input
                    placeholder="Cari berita berdasarkan judul..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                />

                <Select value={categoryFilter} onValueChange={(val) => setCategoryFilter(val)}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filter kategori" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua Kategori</SelectItem>
                        {categories?.map((cat: Category) => (
                            <SelectItem key={cat._id} value={cat._id}>
                                {cat.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="rounded-md border bg-white shadow">
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
                                    Tidak ada berita
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
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
