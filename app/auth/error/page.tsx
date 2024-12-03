
import { ErrorCard } from '@/components/auth/ErrorCard'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

const AthErrorPage = async() => {
  const isLoggedIn = await currentUser()

if(isLoggedIn){
  
  redirect("/frontend")
} else{
  return (
    <ErrorCard/>
  )
}
}

export default AthErrorPage;