import { ReactNode } from "react";
import { Nav, NavLink } from "@/components/Nav";
import { ThemePicker } from "@/components/ThemePicker";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{ children: ReactNode; }>) {
  return <>
    <div className='flex justify-end p-1'>
      <ThemePicker/>
    </div>
    <Nav>
      <NavLink href='/admin'>Dashboard</NavLink>
      <NavLink href='/admin/products'>Products</NavLink>
      <NavLink href='/admin/users'>Customers</NavLink>
      <NavLink href='/admin/orders'>Sales</NavLink>
    </Nav>
    <div className='container my-6'>{children}</div>
  </>
}
