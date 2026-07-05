import { AuthForm } from "@/components/auth-form";
import { AuthLayout } from "@/components/auth-layout";

// Reads ?redirect= via useSearchParams in AuthForm.
export const dynamic = "force-dynamic";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <AuthForm mode="sign-up" />
    </AuthLayout>
  );
}
