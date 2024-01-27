"use client"

import { Button } from "./ui/button"
import Link from "next/link"

export default function GotoSignIn() {
  return (
    <div>
      <Button asChild>
        <Link href={"/signin"}>Go to signin</Link>
      </Button>
    </div>
  )
}