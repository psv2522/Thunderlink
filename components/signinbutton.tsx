"use client";

import { Button } from "./ui/button";
import Link from "next/link";

export default function SignInButton() {
  return (
    <div>
      <Button asChild>
        <Link href={"/signin"}>Sign in</Link>
      </Button>
    </div>
  );
}
