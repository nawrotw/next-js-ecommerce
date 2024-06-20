import { ReactNode } from "react";
import { Nav, NavLink } from "@/components/Nav";
import { ThemePicker } from "@/components/ThemePicker";
import { auth } from "@/auth";
import { SquareUserRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AuthButton from "@/components/auth/AuthButton.server";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {

  const session = await auth();

  return <>
    <div className='flex justify-end p-1 gap-2 items-center'>
      <ThemePicker/>
      <Separator orientation="vertical" className="py-5"/>
      <div className='flex mx-5'>
        <SquareUserRound/>&nbsp;{session?.user?.name}
      </div>
      <AuthButton/>
    </div>
    <Nav>
      <NavLink href='/'>Home</NavLink>
      <NavLink href='/products'>Products</NavLink>
      <NavLink href='/orders'>My Orders</NavLink>
    </Nav>
    <div className='container my-6'>{children}</div>
  </>
}
