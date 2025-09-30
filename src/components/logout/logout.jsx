import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export function Logout() {
    const navigate = useNavigate();
    function handleClick() {
        Cookies.remove("token");
        navigate("/");
    }
    return (
        <div className="flex justify-end">
             <Button onClick={handleClick} variant="outline" size="icon">
                <LogOut />
             </Button>
        </div>
    );
}