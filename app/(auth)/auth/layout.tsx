import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950">
      {children}
    </main>
  );
};

export default AuthLayout;
