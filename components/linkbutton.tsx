//https://icons.duckduckgo.com/ip2/www.google.com.ico
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";


export default function LinkButton({
  username,
  url,
}: {
  username: string;
  url: string;
}) {
  return (
    <div className="mx-auto mt-6 w-4/12 justify-center">
      <Link href={url}>
        <div className="flex flex-row justify-between rounded-full border-2 border-solid border-gray-700 p-1 shadow-inner">
          <Image
            src="https://icons.duckduckgo.com/ip2/www.google.com.ico"
            width={25}
            height={25}
            alt="Social Media Icon"
            className="rounded-full"
          />
          <div className="flex flex-1 flex-row place-items-center justify-center gap-2 text-lg">
            {username}
            <ExternalLink size={16} />
          </div>
        </div>
      </Link>
    </div>
  );
}
