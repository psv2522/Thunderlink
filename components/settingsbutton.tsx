"use client";

import { Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function SettingsButton() {
  return (
    <div>
      <Button asChild className="bg-transparent hover:bg-transparent">
        <Link href={"/settings"}>
          <Settings className="text-black dark:text-gray-200" />
        </Link>
      </Button>
    </div>
  );
}
