import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ProfileForm } from "./profile-form";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";

export default async function Settings() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  const email = session.user?.email!;

  const profile = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      name: true,
      email: true,
      image: true,
      userinfo: {
        select: {
          accountId: true,
          bio: true,
          bgImage: true,
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm info={profile} />
    </div>
  );
}
