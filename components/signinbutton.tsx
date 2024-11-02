"use client";

import { Button } from "./ui/button";
import Link from "next/link";

export default function SignInButton() {
  return (
    <div>
      <Button asChild variant={"secondary"}>
        <Link href={"/signin"}>Sign in</Link>
      </Button>
    </div>
  );
}