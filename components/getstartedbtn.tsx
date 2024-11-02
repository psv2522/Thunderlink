"use client";
import Link from "next/link";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export default function GetStartedBtn() {
  return (
    <Link href="/signin">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105 dark:from-purple-500 dark:to-blue-500"
      >
        <span>Get your Thunderlink</span>
      </HoverBorderGradient>
    </Link>
  );
}
