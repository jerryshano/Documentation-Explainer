import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./avatar";
 
export function Header() {
  return (
    <header className="bg-secondary border">
      <div className="flex items-center justify-between p-3">
        <Link href='/'>
          <div className="flex items-center gap-2">

          <Image src='/goat.png' alt='logo' width={32} height={32} />
          <span className="font-bold text-4xl tracking-tight">
            DOCEXPLAINR
          </span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
            <Avatar
            className="size-12 rounded-lg!"
            > 
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