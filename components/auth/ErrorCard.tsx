
import { div } from "framer-motion/client"
import { CardWrapper } from "./card-wrapper"
import { FaExclamationTriangle } from "react-icons/fa"
import { Button } from "../ui/button"
import Link from "next/link"

export const ErrorCard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
    <CardWrapper
    headerLabel="Oops! Something went wrong!"
    >
        <div className="w-full flex justify-center items-center">
<FaExclamationTriangle className="text-destructive mb-3"/>
        </div>
        <div
        className="flex justify-center w-full items-center"
        >
<Link
href={"/auth/login"}
>
<Button
variant={"link"}
className="text-blue-600"
>
  Back To Login
</Button>
</Link>
        </div>
    </CardWrapper>
    </div>
  )
}
