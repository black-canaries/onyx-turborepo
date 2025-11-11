import { SignUpForm } from "../components/sign-up-form";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary p-4">
      <div className="flex flex-col items-center gap-6">
        <SignUpForm />

        <div className="flex items-center gap-2 text-sm">
          <span className="text-secondary">Already have an account?</span>
          <Link
            href="/sign-in"
            className="text-brand-secondary hover:text-brand-secondary_hover font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
