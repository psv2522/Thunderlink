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
  const faviconUrl = `https://icons.duckduckgo.com/ip3/${new URL(url).hostname}.ico`;

  return (
    <div className="w-full">
      <Link href={url} target="_blank" rel="noopener noreferrer">
        <div className="group flex items-center gap-3 sm:gap-4 rounded-full bg-white/10 p-3.5 sm:p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <Image
            src={faviconUrl}
            width={28}
            height={28}
            alt="Social Media Icon"
            className="rounded-full transition-transform duration-300 group-hover:rotate-12 w-7 h-7 sm:w-8 sm:h-8"
          />
          <div className="flex flex-1 items-center justify-between">
            <span className="text-base sm:text-lg font-medium text-white/90 truncate">{username}</span>
            <ExternalLink 
              size={18} 
              className="text-white/70 transition-transform duration-300 group-hover:translate-x-1" 
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
