import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";

async function handleGoogleSignIn() {
  "use server";
  await signIn("google");
}

async function handleGithubSignIn() {
  "use server";
  await signIn("github");
}

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="h-[18px] w-[18px] shrink-0"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"
      />
      <path
        fill="#34A853"
        d="M6.3 14.7l6.6 4.8C14.7 15.4 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"
      />
      <path
        fill="#FBBC05"
        d="M24 44c5.2 0 9.9-2 13.5-5.3l-6.2-5.2C29.5 35.2 26.9 36 24 36c-5.3 0-9.7-3.6-11.3-8.3l-6.6 5.1C9.4 39.4 16.1 44 24 44z"
      />
      <path
        fill="#EA4335"
        d="M44 24c0-1.2-.1-2.3-.4-3.5H24v8h11.3c-.8 2.3-2.2 4.2-4 5.6l6.2 5.2C41.7 35.7 44 30.2 44 24z"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[19px] w-[19px] shrink-0"
      aria-hidden="true"
    >
      <path d="M12 .297a12 12 0 0 0-3.797 23.4c.6.111.82-.261.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.216.694.825.576A12.001 12.001 0 0 0 12 .297" />
    </svg>
  );
}

export default function SignInFormClient() {
  return (
    <Card className="w-full rounded-2xl border border-[#252B3B] bg-[#111522] text-[#F4F6FC] shadow-[0_12px_40px_rgba(0,0,0,0.2)]">
      <CardHeader className="space-y-2 px-6 pb-1 pt-7">
        <CardTitle className="text-center text-xl font-semibold tracking-tight">
          Sign in to Rivet
        </CardTitle>

        <CardDescription className="text-center text-sm leading-6 text-[#9AA4B8]">
          Continue to your AI development workspace.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 px-6 pb-6 pt-6">
        <form action={handleGoogleSignIn}>
          <Button
            type="submit"
            variant="outline"
            className="h-11 w-full justify-center gap-3 rounded-lg border-[#30364A] bg-[#0B0E18] text-sm font-medium text-[#F4F6FC] transition-colors hover:border-[#8B5CF6]/60 hover:bg-[#8B5CF6]/[0.07] hover:text-white"
          >
            <GoogleIcon />
            Continue with Google
          </Button>
        </form>

        <form action={handleGithubSignIn}>
          <Button
            type="submit"
            variant="outline"
            className="h-11 w-full justify-center gap-3 rounded-lg border-[#30364A] bg-[#0B0E18] text-sm font-medium text-[#F4F6FC] transition-colors hover:border-[#8B5CF6]/60 hover:bg-[#8B5CF6]/[0.07] hover:text-white"
          >
            <GithubIcon />
            Continue with GitHub
          </Button>
        </form>

        <div className="flex items-center gap-3 pt-2">
          <div className="h-px flex-1 bg-[#252B3B]" />
          <span className="text-[10px] font-medium tracking-[0.12em] text-[#647087]">
            SECURE SIGN IN
          </span>
          <div className="h-px flex-1 bg-[#252B3B]" />
        </div>
      </CardContent>

      <CardFooter className="border-t border-[#252B3B] px-6 py-4">
        <p className="w-full text-center text-xs leading-5 text-[#8792A8]">
          By continuing, you agree to our{" "}
          <a
            href="/terms"
            className="text-[#B7A0FF] hover:text-white hover:underline"
          >
            Terms
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="text-[#B7A0FF] hover:text-white hover:underline"
          >
            Privacy Policy
          </a>
          .
        </p>
      </CardFooter>
    </Card>
  );
}
