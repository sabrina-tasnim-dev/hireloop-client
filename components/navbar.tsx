import Image from "next/image"
import Link from "next/link"

import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { authItems, navItems } from "@/lib/navigation"

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card/70 px-4 shadow-xs backdrop-blur-md sm:px-5">
        <Link
          href="/"
          aria-label="HireLoop home"
          className="flex shrink-0 items-center"
        >
          <Image
            src="/images/logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </Link>

        <div className="flex items-center gap-4">
          <nav
            aria-label="Main"
            className="hidden items-center gap-6 md:flex lg:gap-8"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Separator orientation="vertical" className="hidden h-5 md:block" />

          <div className="hidden items-center gap-4 md:flex">
            <Link
              href={authItems.signIn}
              className="text-sm font-medium text-brand transition-colors hover:text-brand/80"
            >
              Sign In
            </Link>
            <Button
              variant="brand"
              nativeButton={false}
              render={<Link href={authItems.signUp} />}
            >
              Get Started
            </Button>
          </div>

          <MobileNav />
        </div>
      </div>
    </header>
  )
}
