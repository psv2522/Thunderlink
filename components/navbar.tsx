import * as React from "react";
import { ModeToggle } from "./modetoggle";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import LogoutButton from "./logoutbutton";
import SignInButton from "./signinbutton";
import SettingsButton from "./settingsbutton";

export default async function NavBar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="fixed w-full">
      <nav className="z-10 px-4 py-3">
        <div className="mx-auto w-11/12 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md dark:bg-black/10">
          <div className="flex h-10 items-center justify-between">
            <Link href={"/"}>
              <div className="flex space-x-3 text-xl font-semibold">
                <Image src="/logo.png" width={30} height={30} alt="logo" className="rounded-full" />
                <span>Thunderlink</span>
              </div>
            </Link>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-4 py-2">
                {session ? (
                  <>
                    <LogoutButton />
                    <SettingsButton />
                  </>
                ) : (
                  <SignInButton />
                )}
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}