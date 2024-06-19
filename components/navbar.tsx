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
    <div>
      <nav className="sticky top-0 z-10 pt-5">
        <div className="mx-auto w-11/12 rounded-2xl border-solid border-2 shadow-lg px-4 py-3">
          <div className="flex h-16 items-center justify-between">
            <Link href={"/"}>
              <div className="flex space-x-3 text-xl font-semibold">
                <Image src="/logo.svg" width={20} height={20} alt="logo" />
                <span>Zaplink</span>
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
