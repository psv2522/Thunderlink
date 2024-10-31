import LinkButton from "@/components/linkbutton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { getUserLinks } from "@/app/actions/getUserLinks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, User as UserIcon } from "lucide-react";

export default async function User({ params }: { params: { id: string } }) {
  const id = params.id;
  const session = await getServerSession(authOptions);
  
  const currentUserInfo = session?.user ? await prisma.userinfo.findFirst({
    where: {
      user: {
        email: session.user.email
      }
    },
    select: {
      accountId: true
    }
  }) : null;

  const userexists = await prisma.userinfo.findUnique({
    where: {
      accountId: id,
    },
    select: {
      bio: true,
      accountId: true,
      bgImage: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  if (userexists?.accountId != id) {
    return <div>Account does not exist</div>;
  }

  const userLinks = await getUserLinks(id);

  return (
    <div
      className="min-h-screen bg-cover bg-fixed bg-center bg-no-repeat bg-black"
      style={{
        backgroundImage: userexists.bgImage 
          ? `url("${userexists.bgImage}")` 
          : 'none',
      }}
    >
      {session?.user && (
        <div className="absolute right-2 top-2 sm:right-4 sm:top-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <UserIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={`/user/${currentUserInfo?.accountId}`}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-[90%] sm:w-[85%] md:w-[75%] lg:w-[50%] flex flex-col items-center">
          <div className="text-center w-full max-w-md">
            <Image
              src={userexists?.user.image ?? "/profilepic.jpg"}
              width={100}
              height={100}
              alt="Profile picture"
              className="mx-auto rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-[120px] md:h-[120px]"
              priority
            />
            <p className="mt-6 mb-2 text-xl sm:text-2xl font-semibold">{userexists?.user.name}</p>
            <p className="mb-2 text-base sm:text-lg text-white/80">@{id}</p>
            <p className="mb-8 text-sm sm:text-base text-white/70">{userexists?.bio}</p>
            <div className="space-y-3 sm:space-y-4">
              {userLinks.map((link, index) => (
                <LinkButton
                  key={index}
                  username={link.username}
                  url={link.baseUrl}
                />
              ))}
            </div>
          </div>
          {!session && (
            <div className="mt-12 sm:mt-16">
              <Link href="/signin">
                <Button 
                  className="rounded-full text-sm sm:text-base px-6 py-2.5 sm:px-8 sm:py-3" 
                  variant={"secondary"}
                >
                  Get your Thunderlink now!
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
