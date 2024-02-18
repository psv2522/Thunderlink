"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "./ui/use-toast";

export default function SignInForm() {
  const [email, setEmail] = useState<null | string>(null);

  async function SignInWithEmail() {
    const signInResult = await signIn("email", {
      email: email,
      callbackUrl: `${window.location.origin}`,
      redirect: false,
    });

    if (!signInResult) {
      return toast({
        title: "Well this did not work",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    }

    return toast({
      title: "Check your email",
      description: "Click the magic link to login",
    });
  }

  return (
    <div>
      <form action={SignInWithEmail}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="example@gmail.com"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Sign In</Button>
        </CardFooter>
      </form>
    </div>
  );
}
