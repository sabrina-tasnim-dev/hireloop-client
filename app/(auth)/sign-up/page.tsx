"use client"

import { SignUpForm } from "@/components/auth/sign-up-form"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const router = useRouter()

  async function handleSignUp(data: Record<string, string>) {
    const role =
      data.role === "recruiter" || data.role === "admin" ? data.role : "seeker"

    const { data: signUpResponse, error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      role,
      callbackURL: "/",
    })

    console.log("signup response", signUpResponse, error)

    if(!error){
        router.refresh()
        router.push("/")
    }
  }
  return <SignUpForm onSubmit={handleSignUp} />
}
