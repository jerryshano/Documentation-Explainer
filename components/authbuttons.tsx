"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (session) {
    return (
      <>
        <span>Signed in as {session.user?.email}</span>
        <Button type="button" onClick={() => signOut()}>
          Sign out
        </Button>
      </>
    );
  }

  return (
    <Button type="button" onClick={() => signIn()}>
      Sign in with Google
    </Button>
  );
}
