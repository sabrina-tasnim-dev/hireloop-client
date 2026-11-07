import Link from "next/link"

import { cn } from "@/lib/utils"

export type AuthMode = "sign-in" | "sign-up"

const copy: Record<AuthMode, { title: string; description: string }> = {
  "sign-in": {
    title: "Welcome back",
    description: "Sign in to your HireLoop account to continue.",
  },
  "sign-up": {
    title: "Create your account",
    description: "Join HireLoop and start applying to jobs.",
  },
}

const modes: { mode: AuthMode; label: string; href: string }[] = [
  { mode: "sign-in", label: "Sign In", href: "/sign-in" },
  { mode: "sign-up", label: "Sign Up", href: "/sign-up" },
]

export function AuthCard({
  mode,
  children,
}: {
  mode: AuthMode
  children: React.ReactNode
}) {
  const { title, description } = copy[mode]

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-[0_16px_48px_-16px_rgb(0_0_0/0.6)] backdrop-blur-md sm:rounded-3xl sm:p-8">
        <div className="flex flex-col gap-1.5 text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <nav
          aria-label="Authentication"
          className="mt-6 grid grid-cols-2 gap-1 rounded-xl border border-border/60 bg-muted/40 p-1"
        >
          {modes.map((item) => {
            const isActive = item.mode === mode

            return (
              <Link
                key={item.mode}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2 text-center text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  isActive
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {children}
      </div>
    </div>
  )
}
