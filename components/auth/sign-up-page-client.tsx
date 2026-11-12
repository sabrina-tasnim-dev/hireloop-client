"use client"

import { useRouter } from "next/navigation"

import { SignUpForm } from "@/components/auth/sign-up-form"
import { authClient } from "@/lib/auth-client"

export function SignUpPageClient() {
  const router = useRouter()

  async function handleSignUp(
    data: Record<string, string>
  ): Promise<string | void> {
    const role =
      data.role === "recruiter" || data.role === "admin"
        ? data.role
        : "seeker"

    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      role,
      callbackURL: "/",
    })

    if (error) {
      return (
        error.message || "Could not create your account. Please try again."
      )
    }

    router.refresh()
    router.push("/")
  }

  return <SignUpForm onSubmit={handleSignUp} />
}
