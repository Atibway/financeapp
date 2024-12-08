import { Header } from "@/components/Header"
import { currentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  if(!user){
    redirect("/auth/login")
  }
  return (
   <>
 <div >
     <Header/>       
  {children}
    </div>
   </>
         
  )
}

