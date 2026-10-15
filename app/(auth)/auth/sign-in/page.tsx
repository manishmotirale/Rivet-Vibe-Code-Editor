import Image from "next/image";
import SignInFormClient from "@/features/auth/components/sign-form-client";

export default function SignInPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#080A12] px-5 py-8 font-sans">
      <section className="flex w-full max-w-[390px] flex-col items-center">
        <Image
          src="/rivet-logo.gif"
          alt="Rivet"
          width={480}
          height={240}
          priority
          unoptimized
          className="mb-5 h-auto w-[172px] object-contain"
        />

        <SignInFormClient />

        <p className="mt-5 text-center text-xs text-[#647087]">
          Your workspace. Your tools. Your flow.
        </p>
      </section>
    </main>
  );
}