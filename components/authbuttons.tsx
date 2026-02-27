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
        <span className="text-lg font-medium">
          Signed in as {session.user?.email}
        </span>
        <Button
          className="h-12 w-20 rounded-xl text-lg font-medium"
          type="button"
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      </>
    );
  }

  return (
    <Button
      className="h-12 w-17 rounded-xl text-lg font-medium"
      type="button"
      onClick={() => signIn()}
    >
      Sign in
    </Button>
  );
}
