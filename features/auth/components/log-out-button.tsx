"use client";

import type { LogoutButtonProps } from "../types";
import { signOut } from "next-auth/react";

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onLogout = async () => {
    await signOut({
      callbackUrl: "/auth/sign-in",
    });
  };

  return (
    <span
      role="button"
      tabIndex={0}
      className="cursor-pointer"
      onClick={onLogout}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          void onLogout();
        }
      }}
    >
      {children}
    </span>
  );
};

export default LogoutButton;
