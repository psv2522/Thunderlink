import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SignInGithub from "@/components/signingithub"
import SignInGoogle from "@/components/signingoogle"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import SignInForm from "@/components/signinform"


export default async function AuthenticationPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/")
  }
  
  return (
    <div className="h-screen mx-auto my-auto flex items-center justify-center">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Enter your email below to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex justify-center gap-16">
              <SignInGithub/>
              <SignInGoogle/>
          </div>
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
        </CardContent>
        <SignInForm/>
      </Card>
    </div>
  )
}