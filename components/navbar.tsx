"use client";

import * as React from "react";
import { ModeToggle } from "./modetoggle";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function NavBar() {
  return (
    <div>
      <nav className="sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-30 border-b ">
        <div className="max-w-7xl mx-auto px-4">
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
                <Link href={"/about"}>About</Link>
                <Button asChild>
                  <Link href={"/signin"}>Log In</Link>
                </Button>
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

