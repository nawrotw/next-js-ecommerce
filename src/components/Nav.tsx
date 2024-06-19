"use client"

import { ReactNode, ComponentProps } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Nav({
  children,
}: Readonly<{ children: ReactNode; }>) {
  return <nav className="bg-primary text-primary-foreground flex px-4">
    {children}
  </nav>
}

export function NavLink(props: Omit<ComponentProps<typeof Link>,'className'>) {
  const pathName = usePathname();
  const isCurrentPath = pathName === props.href;
  return <Link {...props} className={cn(
    "p-4 " +
    "hover:bg-secondary hover:text-secondary-foreground",
    // "focus-visible:bg-secondary focus-visible:text-secondary-foreground",
    isCurrentPath && "bg-background text-foreground"
  )}
  ></Link>
}
