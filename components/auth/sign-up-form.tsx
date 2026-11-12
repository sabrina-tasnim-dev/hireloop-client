"use client"

import { useState, type FormEvent } from "react"
import { Briefcase, Building2, Loader2, ShieldCheck } from "lucide-react"

import { AuthCard } from "@/components/auth/auth-card"
import { Field, PasswordField } from "@/components/auth/form-fields"
import { Button } from "@/components/ui/button"

const roles = [
  {
    value: "seeker",
    label: "Job Seeker",
    hint: "Find your next role",
    icon: Briefcase,
  },
  {
    value: "recruiter",
    label: "Recruiter",
    hint: "Hire top talent",
    icon: Building2,
  },
  {
    value: "admin",
    label: "Admin",
    hint: "Manage the platform",
    icon: ShieldCheck,
  },
] as const

type SignUpFormProps = {
  onSubmit?: (data: Record<string, string>) => Promise<string | void>
}

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const data: Record<string, string> = {}
    formData.forEach((value, key) => {
      data[key] = String(value)
    })

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match. Please re-enter them.")
      return
    }

    setIsSubmitting(true)
    try {
      const message = await onSubmit?.(data)
      if (message) {
        setError(message)
      }
    } catch {
      setError("Something went wrong while creating your account. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthCard mode="sign-up">
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-destructive/40 bg-destructive/10 px-3.5 py-3 text-sm text-destructive"
          >
            {error}
          </div>
        )}

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
            {roles.map(({ value, label, hint, icon: Icon }) => (
              <label key={value} className="group cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={value}
                  defaultChecked={value === "seeker"}
                  required
                  className="peer sr-only"
                />
                <span className="flex flex-col items-center gap-1 rounded-xl border border-border/60 bg-background/60 px-2 py-3 text-center text-muted-foreground transition-colors peer-checked:border-brand/60 peer-checked:bg-brand/10 peer-checked:text-brand peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50 hover:border-brand/40 hover:text-foreground">
                  <Icon aria-hidden className="size-4" />
                  <span className="text-xs font-medium">{label}</span>
                  <span className="hidden text-[11px] leading-tight text-muted-foreground group-has-checked:text-brand/80 sm:block">
                    {hint}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col gap-1.5">
          <PasswordField
            label="Password"
            name="password"
            placeholder="Create a password"
            autoComplete="new-password"
            minLength={8}
            required
          />
          <p className="text-xs text-muted-foreground">
            Must be at least 8 characters.
          </p>
        </div>
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
          disabled={isSubmitting}
          className="mt-1 h-11 w-full rounded-xl"
        >
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" />
              Creating account…
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </AuthCard>
  )
}
