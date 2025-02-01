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
      <nav className="z-10 px-2 py-2 sm:px-4 sm:py-3">
        <div className="mx-auto w-[95%] rounded-2xl border border-white/10 bg-white/10 px-2 py-2 backdrop-blur-md sm:w-11/12 sm:px-4 sm:py-3 dark:bg-black/10">
          <div className="flex h-10 items-center justify-between">
            <Link href={"/"}>
              <div className="flex items-center justify-center space-x-2 text-sm font-semibold sm:space-x-3 sm:text-base">
                <Image
                  src="/logo.png"
                  width={28}
                  height={28}
                  alt="logo"
                  className="rounded-full"
                />
                <span className="hidden sm:inline">Thunderlink</span>
              </div>
            </Link>
            <div className="flex space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2 py-2 sm:space-x-4">
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
