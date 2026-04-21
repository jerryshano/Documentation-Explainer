"use client";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { AuthButtons } from "./authbuttons";
import { SidebarTrigger } from "./ui/sidebar";

export function Header() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Two-phase render so server HTML matches first client paint; then show theme-accurate logo.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with next-themes after mount
    setMounted(true);
  }, []);

  const logoSrc =
    mounted && resolvedTheme === "dark"
      ? "/ai_vector.svg"
      : "/ai_color_vector.svg";

  return (
    <header className="bg-background border">
      <div className="flex items-center justify-between py-3 px-4">
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <SidebarTrigger
              variant="outline"
              className="h-13 w-13 shrink-0 rounded-xl [&_svg]:size-6"
            />
          </div>
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image
                key={logoSrc}
                src={logoSrc}
                alt="logo"
                width={46}
                height={46}
                className="h-12 w-12 md:h-12 md:w-12 object-contain rounded-xl"
              />
              <span className="font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent hidden md:block text-4xl lg:text-5xl tracking-tight">
                DOCEXPLAINR
              </span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4 lg:gap-5">
          <AuthButtons />
          <ModeToggle />
          <Avatar className="size-12 md:size-14 rounded-lg!">
            <Link href="https://github.com/jerryshano" target="_blank">
              <AvatarImage src="/github.jpg" className="rounded-lg" />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Link>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
