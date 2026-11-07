import type { Metadata } from "next"

import { SignUpForm } from "@/components/auth/sign-up-form"
import { authClient } from "@/lib/auth-client"

export const metadata: Metadata = {
  title: "Sign Up | HireLoop",
  description: "Create a HireLoop account and start applying to jobs.",
}

async function handleSignUp(data: Record<string, string>) {
  "use server"

  const { data: signUpResponse, error } = await authClient.signUp.email({
    name: data.name,
    email: data.email,
    password: data.password,
    callbackURL: "/",
  })

  console.log("signup response", signUpResponse, error)
}

export default function SignUpPage() {
  return <SignUpForm onSubmit={handleSignUp} />
}
