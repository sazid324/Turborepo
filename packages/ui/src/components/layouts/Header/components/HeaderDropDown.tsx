import { CircleUserRound, Handshake, Package, User } from "lucide-react";

import SignOut from "@repo/ui/src/components/common/SignOut/SignOut";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@repo/ui/src/components/ui/dropdown-menu";
import Link from "next/link";
import { dashboardAppUrls } from "@repo/dashboard/lib/config/appUrls";

export default function HeaderDropDownComponent() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <CircleUserRound className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-inter w-56 font-medium">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href={dashboardAppUrls.PROTECTED.USER}>
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href={"/partner"}>
                        <DropdownMenuItem>
                            <Handshake className="mr-2 h-4 w-4" />
                            <span>Become partner</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href={"/order-list"}>
                        <DropdownMenuItem>
                            <Package className="mr-2 h-4 w-4" />
                            <span>Orders</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <SignOut />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
