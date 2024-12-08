"use client"
import { logout } from "@/actions/logout";
import {  useRouter } from "next/navigation";


interface LogoutButtonProps {
    children?: React.ReactNode;
}

export const LogoutButton = ({
    children
}: LogoutButtonProps)=> {
    const router = useRouter()
const onClick = ()=> {
    logout()
    router.refresh()
    router.push("/auth/login")
};

return (
    <span onClick={onClick} className="curser-pointer">
        {children}
    </span>
)
}