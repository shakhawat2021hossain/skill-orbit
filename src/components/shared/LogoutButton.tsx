"use client"

import { deleteCookie } from "@/lib/handleToken";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const LogoutButton = () => {
    return (
        <Button
            onClick={async () => {
                await deleteCookie("token")
                toast.success("Logout Successful")

            }}
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            asChild
        >
            <div>
                <LogOut className="h-5 w-5 mr-3" />
                Logout
            </div>
        </Button>
        
    );
};

export default LogoutButton;