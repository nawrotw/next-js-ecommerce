"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toggleProductAvailability, deleteProduct } from "@/app/admin/_actions/product";

export interface ActiveToggleDropdownItemProps {
  id: string
  isAvailableForPurchase: boolean
}

export function ActiveToggleDropdownItem({ id, isAvailableForPurchase }: ActiveToggleDropdownItemProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      await toggleProductAvailability(id, !isAvailableForPurchase)
      router.refresh()
    });
  }
  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={handleClick}
    >
      {isAvailableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  )
}

export interface DeleteDropdownItemProps {
  id: string
  disabled: boolean
}

export function DeleteDropdownItem({ id, disabled }: DeleteDropdownItemProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      await deleteProduct(id);
      router.refresh();
    });
  }
  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={disabled || isPending}
      onClick={handleClick}
    >
      Delete
    </DropdownMenuItem>
  )
}
