import { StoriesDataTable } from "./StoriesDataTable";

function DashboardStories() {

    return (
        <div className="p-6">
            <div className="items-center mb-6">
                <h1 className="text-2xl font-bold text-primary-0">Manajemen Story</h1>
            </div>

            <StoriesDataTable  />
        </div>
    );
}

export default DashboardStories;
