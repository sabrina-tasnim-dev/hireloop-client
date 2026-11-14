export type NavItem = {
  label: string
  href: string
}

export const navItems = (role?: string): NavItem[] => [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
  ...(role ? [{ label: "Dashboard", href: `/dashboard/${role}` }] : []),
]

export const authItems = {
  signIn: "/sign-in",
  signUp: "/sign-up",
  signOut:"/signOut"
} as const
