"use client";
import Link from "next/link";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export default function GetStartedBtn() {
  return (
    <div>
      <Link href="/signin">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white"
        >
          <span>Get your Thunderlink</span>
        </HoverBorderGradient>
      </Link>
    </div>
  );
}
