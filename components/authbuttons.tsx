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

export function AuthButtons() {
  const { data: session, status } = useSession();

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
            <button className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-slate-800 transition">
              <div className="size-12 rounded-full bg-slate-600 flex items-center justify-center text-white font-medium">
                {initial}
              </div>
            </button>
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
