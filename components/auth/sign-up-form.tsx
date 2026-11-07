"use client"

import { useState, type FormEvent } from "react"
import { Briefcase, Building2, ShieldCheck } from "lucide-react"

import { AuthCard } from "@/components/auth/auth-card"
import {
  CollectedData,
  Field,
  PasswordField,
} from "@/components/auth/form-fields"
import { Button } from "@/components/ui/button"

const roles = [
  { value: "seeker", label: "Job Seeker", icon: Briefcase },
  { value: "recruiter", label: "Recruiter", icon: Building2 },
  { value: "admin", label: "Admin", icon: ShieldCheck },
] as const

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

        <fieldset className="flex min-w-0 flex-col gap-1.5">
          <legend className="text-sm font-medium text-foreground">
            Account Type
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {roles.map(({ value, label, icon: Icon }) => (
              <label key={value} className="cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={value}
                  defaultChecked={value === "seeker"}
                  required
                  className="peer sr-only"
                />
                <span className="flex flex-col items-center gap-1.5 rounded-xl border border-border/60 bg-background/60 px-2 py-3 text-center text-muted-foreground transition-colors peer-checked:border-brand/60 peer-checked:bg-brand/10 peer-checked:text-brand peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50 hover:border-brand/40 hover:text-foreground">
                  <Icon aria-hidden className="size-4" />
                  <span className="text-xs font-medium">{label}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

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
