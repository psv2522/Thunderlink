import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInGoogle from "@/components/signingoogle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignInForm from "@/components/signinform";

export default async function AuthenticationPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/u");
  }

  return (
    <div className="mx-auto my-auto flex h-screen items-center justify-center bg-muted/50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Welcome</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <SignInForm />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <SignInGoogle />
        </CardContent>
      </Card>
    </div>
  );
}
