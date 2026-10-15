"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import { LogOut, User } from "lucide-react";
import { useCurrentUser } from "../hooks.ts/use-current-user";
import LogOutButton from "./log-out-button";

const UserButton = () => {
  const user = useCurrentUser();

  if (!user) return null;

  const initials =
    user.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-9 w-9 cursor-pointer border border-[#252B3B] transition-colors hover:border-[#8B5CF6]">
          <AvatarImage
            src={user.image ?? undefined}
            alt={user.name ?? "User avatar"}
          />
          <AvatarFallback className="bg-[#8B5CF6]/15 text-sm font-medium text-[#C4B5FD]">
            {user.name?.charAt(0).toUpperCase() ?? <User className="h-4 w-4" />}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="mr-1 w-64 rounded-xl border border-[#252B3B] bg-[#111522] p-1.5 text-[#F4F6FC] shadow-xl shadow-black/30"
      >
        <div className="flex items-center gap-3 px-3 py-3">
          <Avatar className="h-10 w-10 border border-[#252B3B]">
            <AvatarImage
              src={user.image ?? undefined}
              alt={user.name ?? "User avatar"}
            />
            <AvatarFallback className="bg-[#8B5CF6]/15 text-[#C4B5FD]">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {user.name ?? "Rivet User"}
            </p>
            <p className="truncate text-xs text-[#9AA4B8]">
              {user.email ?? "No email available"}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-[#252B3B]" />

        <DropdownMenuItem
          disabled
          className="gap-2 rounded-lg px-3 py-2 text-xs text-[#9AA4B8] opacity-100"
        >
          <User className="h-4 w-4" />
          Signed in to Rivet
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-[#252B3B]" />

        <LogOutButton>
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer gap-2 rounded-lg px-3 py-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </LogOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
