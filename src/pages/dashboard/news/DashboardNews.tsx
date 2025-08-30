import { Button } from "@/components/ui/button";
import { NewsDataTable } from "./NewsDataTable";
import { useNavigate } from "react-router-dom";

function DashboardNews() {
    const navigate = useNavigate();

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-primary-0">Manajemen News</h1>
                <Button className="ml-auto" onClick={() => navigate("/dashboard/news/add-news")}>
                    Tambah Berita
                </Button>
            </div>

            <NewsDataTable />
        </div>
    );
}

export default DashboardNews;
