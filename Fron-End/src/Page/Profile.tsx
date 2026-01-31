import { useNavigate } from "react-router-dom";
import { getAuth, clearAuth } from "@/Utils/auth";
import { Button } from "@/components/ui/button";

export default function Profile() {
    const navigate = useNavigate();
    const user = getAuth();

    function handleLogout() {
        clearAuth();
        navigate("/login");
    }

    if (!user) {
        return null;
    }

    return (
        <div className="w-full max-w-sm space-y-4">
            <h1 className="font-bold text-2xl text-center">Profile</h1>
            <div className="rounded-lg border bg-card p-4 text-card-foreground space-y-2">
                <p className="text-sm text-muted-foreground">Full name</p>
                <p className="font-medium">{user.fullName}</p>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
            </div>
            <Button variant="outline" className="w-full" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
}
