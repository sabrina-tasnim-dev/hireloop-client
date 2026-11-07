"use client"

import { useState, type FormEvent } from "react"

import { AuthCard } from "@/components/auth/auth-card"
import {
  CollectedData,
  Field,
  PasswordField,
} from "@/components/auth/form-fields"
import { Button } from "@/components/ui/button"

type SignUpFormProps = {
  onSubmit?: (data: Record<string, string>) => void | Promise<void>
}

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(
    null
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data: Record<string, string> = {}
    formData.forEach((value, key) => {
      data[key] = String(value)
    })

    console.log("Sign-up form data:", data)
    setSubmitted(data)

    await onSubmit?.(data)
  }

  return (
    <AuthCard mode="sign-up">
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <Field
          label="Full Name"
          type="text"
          name="name"
          placeholder="John Doe"
          autoComplete="name"
          required
        />
        <Field
          label="Email"
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <PasswordField
          label="Password"
          name="password"
          placeholder="Create a password"
          autoComplete="new-password"
          minLength={8}
          required
        />
        <PasswordField
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          minLength={8}
          required
        />

        <Button
          type="submit"
          variant="brand"
          className="mt-1 h-11 w-full rounded-xl"
        >
          Create Account
        </Button>
      </form>

      {submitted && <CollectedData data={submitted} />}
    </AuthCard>
  )
}
