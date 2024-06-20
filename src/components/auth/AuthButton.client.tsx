"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "@/auth/helpers";

export default function AuthButton() {
  const session = useSession();

  const handleSignIn = async () => {
    await signIn();
  }
  const handleSignOut = async () => {
    await signOut();
    await signIn();
  }

  return session?.data?.user ? (
    <Button onClick={handleSignOut}>Sign Out</Button>
  ) : (
    <Button onClick={signIn}>Sign In</Button>
  );
}
