"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function LogoutButton() {
  return (
    <div>
      <Button
        onClick={() =>
          signOut({
            callbackUrl: `${window.location.origin}/signin`,
          })
        }
        variant={"destructive"}
      >
        Logout
      </Button>
    </div>
  );
}
