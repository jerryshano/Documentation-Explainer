import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { AuthButtons } from "./authbuttons";

export function Header() {
  return (
    <header className="bg-secondary border">
      <div className="flex items-center justify-between py-3 px-4">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/goat.png"
              alt="logo"
              width={32}
              height={32}
              style={{ width: 32, height: "auto" }}
            />
            <span className="font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent hidden md:block text-4xl lg:text-5xl tracking-tight">
              DOCEXPLAINR
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-6 lg:gap-5">
          <AuthButtons />
          <ModeToggle />
          <Avatar className="size-12 md:size-14 lg:size-16 rounded-lg!">
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
