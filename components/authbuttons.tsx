"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function AuthButtons() {
  const { data: session, status } = useSession();
  console.log("session", session);
  console.log("status", status);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (session) {
    const email = session.user?.email ?? "";
    const initial = email.charAt(0).toUpperCase();
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="size-12 rounded-lg!">
              <AvatarImage
                src={session.user?.image ? session.user.image : initial}
                className="rounded-lg"
              />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1 text-md text-muted-foreground">
              {email}
            </div>
            <DropdownMenuItem className="text-lg" onClick={() => signOut()}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
