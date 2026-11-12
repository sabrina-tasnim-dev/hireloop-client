"use client"
import Image from "next/image"
import Link from "next/link"
import { MenuIcon } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { authItems, navItems } from "@/lib/navigation"
import { cn } from "@/lib/utils"
import { useSession } from "@/lib/auth-client"

export function MobileNav() {
  const { data: session } = useSession();

  // const handleSignOut=async()=>{
  //   await signOut()
  // }
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Open navigation menu"
        className="md:hidden"
        render={<Button variant="ghost" size="icon" />}
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="right" className="gap-0 p-0">
        <SheetHeader className="flex-row items-center justify-between border-b border-border">
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <Image
            src="/images/logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            className="h-7 w-auto"
          />
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-3 py-2">
          {navItems.map((item) => (
            <SheetClose
              key={item.href}
              nativeButton={false}
              render={
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                />
              }
            >
              {item.label}
            </SheetClose>
          ))}
        </nav>
        <Separator />
        <SheetFooter>
          {session?.user ? (
            <>
            <span className="text-white">Welcome,{session.user.name}</span>
            <SheetClose
                nativeButton={false}
                render={
                  <Link
                    href={authItems.signOut}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full"
                    )}
                  />
                }
              >
                Sign Out
              </SheetClose>
            </>
          ) : (
            <>
              <SheetClose
                nativeButton={false}
                render={
                  <Link
                    href={authItems.signIn}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full"
                    )}
                  />
                }
              >
                Sign In
              </SheetClose>
              <SheetClose
                nativeButton={false}
                render={
                  <Link
                    href={authItems.signUp}
                    className={cn(
                      buttonVariants({ variant: "brand" }),
                      "w-full"
                    )}
                  />
                }
              >
                Get Started
              </SheetClose>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
