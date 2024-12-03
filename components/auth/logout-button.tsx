import { logout } from "@/actions/logout";
import { redirect, useRouter } from "next/navigation";


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
    redirect("/")
};

return (
    <span onClick={onClick} className="curser-pointer">
        {children}
    </span>
)
}