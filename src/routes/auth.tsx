import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AuthPanel } from "@/components/grambiz/AuthPanel";
import { useAuthUser } from "@/lib/use-auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in or sign up — GramBiz AI" },
      {
        name: "description",
        content:
          "Create your free GramBiz AI account to save your state, village, budget and business plans in Hindi or English.",
      },
      { property: "og:title", content: "Sign in or sign up — GramBiz AI" },
      {
        property: "og:description",
        content: "Log in to GramBiz AI to save your village profile and business recommendations.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user } = useAuthUser();

  useEffect(() => {
    if (user) navigate({ to: "/", replace: true });
  }, [user, navigate]);

  return <AuthPanel />;
}
