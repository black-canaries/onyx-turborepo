import { SignInForm } from "../components/sign-in-form";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary p-4">
      <div className="flex flex-col items-center gap-6">
        <SignInForm />

        <div className="flex items-center gap-2 text-sm">
          <span className="text-secondary">Don&apos;t have an account?</span>
          <Link
            href="/sign-up"
            className="text-brand-secondary hover:text-brand-secondary_hover font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
