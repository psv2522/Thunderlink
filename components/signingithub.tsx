"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { signIn } from "next-auth/react"

export default function SignInGithub() {
  return (
    <div>
      <Button onClick={() => signIn("github", {
        callbackUrl: `${window.location.origin}`
        })} variant="secondary">
        <Icons.gitHub className="mr-2 h-4 w-4" />
        Github
      </Button>
    </div>
    )
}