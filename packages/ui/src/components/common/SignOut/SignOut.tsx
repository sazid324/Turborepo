import { DropdownMenuItem } from "@repo/ui/src/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

export default function SignOut() {
  const { status } = useSession();

  const handleLogOut = () => {
    if (status === "unauthenticated") {
      toast.error("You are not signed in.", {
        position: "top-center",
      });
      return;
    }

    signOut();
  };

  return (
    <DropdownMenuItem onClick={handleLogOut}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </DropdownMenuItem>
  );
}
