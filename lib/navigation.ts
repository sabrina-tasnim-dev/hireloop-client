export type NavItem = {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

export const authItems = {
  signIn: "/sign-in",
  signUp: "/sign-up",
  signOut:"/signOut"
} as const
