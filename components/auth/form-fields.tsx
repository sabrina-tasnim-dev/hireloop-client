"use client"

import { useId, useState, type InputHTMLAttributes } from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"

const inputClassName =
  "h-11 w-full rounded-xl border border-border/60 bg-background/60 px-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 sm:text-base"

type FieldProps = { label: string } & InputHTMLAttributes<HTMLInputElement>

export function Field({ label, className, ...props }: FieldProps) {
  const id = useId()

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input id={id} className={cn(inputClassName, className)} {...props} />
    </div>
  )
}

export function PasswordField({ label, className, ...props }: FieldProps) {
  const id = useId()
  const [visible, setVisible] = useState(false)

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          className={cn(inputClassName, "pr-11", className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? `Hide ${label}` : `Show ${label}`}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-xl text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {visible ? (
            <EyeOff aria-hidden className="size-4" />
          ) : (
            <Eye aria-hidden className="size-4" />
          )}
        </button>
      </div>
    </div>
  )
}

function maskValue(key: string, value: string) {
  if (key.toLowerCase().includes("password")) {
    return "•".repeat(Math.min(value.length, 12))
  }

  return value
}

export function CollectedData({ data }: { data: Record<string, string> }) {
  return (
    <div className="mt-4 rounded-xl border border-brand/40 bg-brand/10 p-3.5">
      <p className="text-sm font-medium text-brand">
        Form data collected — also logged to the console
      </p>
      <dl className="mt-2.5 flex flex-col gap-1.5">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex items-baseline justify-between gap-3">
            <dt className="font-mono text-xs text-muted-foreground">{key}</dt>
            <dd className="truncate text-right text-sm text-foreground">
              {value ? maskValue(key, value) : "—"}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
