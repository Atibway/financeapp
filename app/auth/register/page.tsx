'use client'
import { FormError } from '@/components/form-error'
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { signIn } from 'next-auth/react'
import { useCurrentUser } from '@/hooks/use-current-user'

const RegisterForm= ()=>{
  const searchParams = useSearchParams()
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"? "Email already in use with a different provider": "";
  const callbackUrl = searchParams.get("callbackUrl")
    const onClick = (provider: "google" | "github")=>{
signIn(provider, {
    callbackUrl: callbackUrl || "/dashboard"
})
    }
    const router = useRouter()
    const user = useCurrentUser()
    if(user){
router.push("/dashboard")
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome To The Best Finance App System</CardTitle>
            <CardDescription className="text-center">
              Choose your preferred Sign Up method
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
              onClick={()=> onClick("github")}
               className="w-full" variant="outline">
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
              onClick={()=> onClick("google")}
              className="w-full" variant="outline">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
              </Button>
            </motion.div>
            <FormError message={ urlError}/>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="mt-2 text-xs text-center text-gray-700">
              You have an account?{' '}
              <a href="/auth/login" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

export default RegisterForm;
