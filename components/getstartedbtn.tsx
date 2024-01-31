"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GetStartedBtn() {
  return (
    <div>
      <Button asChild className="text-xl">
        <Link href={"/signin"}>
          Get Started Now
        </Link>
      </Button>
    </div>
  )
}