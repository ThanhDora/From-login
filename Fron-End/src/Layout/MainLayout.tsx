import { Outlet } from "react-router-dom";
export default function MainLayout() {
    return (
        <div className="flex flex-col w-full justify-center items-center min-h-screen">
            <Outlet />
        </div>
    );
}
