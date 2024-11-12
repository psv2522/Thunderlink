import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/sidebar-nav";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Settings",
  description: "Settings page for Thunderlink",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings",
  },
  {
    title: "Links",
    href: "/settings/links",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function SettingsLayout({ children }: SettingsLayoutProps) {
  const session = await getServerSession(authOptions);

  const currentUserInfo = session?.user
    ? await prisma.userinfo.findFirst({
        where: {
          user: {
            email: session.user.email,
          },
        },
        select: {
          accountId: true,
        },
      })
    : null;
  return (
    <div className="space-y-6 p-4 pb-16 md:p-10">
      <div className="flex items-center justify-between">
        <Link
          href={`/u/${currentUserInfo?.accountId}`}
          className="mb-4 text-sm text-muted-foreground hover:text-primary"
        >
          ← Back to Profile
        </Link>
      </div>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set email preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
