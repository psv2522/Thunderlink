import * as React from "react";
import { ModeToggle } from "./modetoggle";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth'
import LogoutButton from "./logoutbutton";
import SignInButton from "./signinbutton";
import SettingsButton from "./settingsbutton";


export default async function NavBar() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <nav className="sticky top-0 z-10 pt-5">
        <div className="w-11/12 mx-auto px-4 py-3 border rounded-2xl">
          <div className="flex items-center justify-between h-16">
            <Link href={"/"}>
              <div className="flex text-xl font-semibold space-x-3">
                <Image
                  src="/logo.svg"
                  width={20}
                  height={20}
                  alt="logo" />
                <span>Zaplink</span>
              </div>
            </Link>
            <div className="flex space-x-4">
              <div className="flex space-x-4 py-2 items-center">
                {session ? (
                  <>
                  <LogoutButton/>
                  <SettingsButton/>
                  </>
                ) : (
                  <SignInButton/>
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

