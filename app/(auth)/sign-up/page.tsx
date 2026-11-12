import type { Metadata } from "next"

import { SignUpPageClient } from "@/components/auth/sign-up-page-client"

export const metadata: Metadata = {
  title: "Sign Up | HireLoop",
  description: "Create a HireLoop account and start applying to jobs.",
}

export default function SignUpPage() {
  return <SignUpPageClient />
}
