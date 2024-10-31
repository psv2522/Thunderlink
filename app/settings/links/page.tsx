import { Separator } from "@/components/ui/separator";
import { LinkForm } from "./link-form";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Links</h3>
        <p className="text-sm text-muted-foreground">
          Manage your links here
        </p>
      </div>
      <Separator />
      <LinkForm />
    </div>
  );
}
