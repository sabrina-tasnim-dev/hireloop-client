"use client"

import { SignInForm } from "@/components/auth/sign-in-form"
import { authClient } from "@/lib/auth-client"

async function handleSignIn(data: Record<string, string>) {
  const { data: signInResponse, error } = await authClient.signIn.email({
    email: data.email,
    password: data.password,
    rememberMe: true,
  })

  console.log("sign in user", signInResponse, error)
}

export default function SignInPage() {
  return <SignInForm onSubmit={handleSignIn} />
}
