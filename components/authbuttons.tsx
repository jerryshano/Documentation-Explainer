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

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (session) {
    const email = session.user?.email ?? "";
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="size-12 md:size-14 lg:size-16 rounded-lg! hover:bg-slate-800 transition duration-300 cursor-pointer">
              <AvatarImage
                referrerPolicy="no-referrer"
                src={session.user?.image ?? ""}
                className="rounded-lg"
              />
              <AvatarFallback className="rounded-lg">
                {session.user?.name?.charAt(0).toUpperCase() ?? ""}
              </AvatarFallback>
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
      className="h-12 w-17 md:w-24 lg:w-25 md:h-14 lg:h-16 rounded-xl text-lg md:text-xl lg:text-2xl lg:font-normal md:font-bold font-medium"
      type="button"
      onClick={() => signIn()}
    >
      Sign in
    </Button>
  );
}
