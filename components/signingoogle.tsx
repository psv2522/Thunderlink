"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { signIn } from "next-auth/react";

export default function SignInGoogle() {
  return (
    <div>
      <Button
        onClick={() =>
          signIn("google", {
            callbackUrl: `${window.location.origin}`,
          })
        }
        variant="secondary"
        className="text-lg"
      >
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
}
