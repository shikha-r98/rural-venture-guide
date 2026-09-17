import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { states } from "@/lib/india-data";
import { useLang } from "@/lib/i18n";

export function AuthPanel() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [stateName, setStateName] = useState(states[0]!.name.en);
  const [village, setVillage] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hi = lang === "hi";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "signup") {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName, state: stateName, village, phone },
          },
        });
        if (err) throw err;
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
      }
      navigate({ to: "/", replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError(hi ? "Google से लॉगिन नहीं हो पाया।" : "Google sign-in failed.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/", replace: true });
  }

  return (
    <div className="flex flex-col gap-3">
      <section className="panel-dark rounded-2xl p-4">
        <h1 className="font-display text-[18px] tracking-wide text-mint">
          {mode === "signin"
            ? hi
              ? "लॉगिन करें"
              : "Sign in"
            : hi
              ? "नया खाता बनाएँ"
              : "Create account"}
        </h1>
        <p className="mt-0.5 text-xs text-paper/60">
          {hi
            ? "ऐप इस्तेमाल करने के लिए पहले लॉगिन करना ज़रूरी है"
            : "Sign in first to use the app"}
        </p>

        <form onSubmit={onSubmit} className="mt-3 flex flex-col gap-2">
          {mode === "signup" && (
            <>
              <Field
                label={hi ? "पूरा नाम" : "Full name"}
                value={fullName}
                onChange={setFullName}
                required
              />
              <label className="flex items-center gap-2 rounded-xl bg-paper/95 px-3 py-2.5">
                <span className="text-base">🗺️</span>
                <select
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-ink outline-none"
                >
                  {states.map((s) => (
                    <option key={s.id} value={s.name.en}>
                      {s.name[lang]}
                    </option>
                  ))}
                </select>
              </label>
              <Field
                label={hi ? "गाँव / कस्बा" : "Village / town"}
                value={village}
                onChange={setVillage}
              />
              <Field
                label={hi ? "मोबाइल नंबर" : "Phone number"}
                value={phone}
                onChange={setPhone}
                type="tel"
              />
            </>
          )}
          <Field
            label={hi ? "ईमेल" : "Email"}
            value={email}
            onChange={setEmail}
            type="email"
            required
          />
          <Field
            label={hi ? "पासवर्ड" : "Password"}
            value={password}
            onChange={setPassword}
            type="password"
            required
          />

          {error && (
            <p className="rounded-lg bg-tomato/15 px-3 py-2 text-xs font-medium text-tomato">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-1 w-full rounded-xl bg-amber py-3 font-display text-[16px] tracking-wide text-sign-deep transition-transform active:scale-[0.99] disabled:opacity-60"
          >
            {busy
              ? hi
                ? "रुकिए…"
                : "Please wait…"
              : mode === "signin"
                ? hi
                  ? "लॉगिन"
                  : "Sign in"
                : hi
                  ? "खाता बनाएँ"
                  : "Sign up"}
          </button>
        </form>

        <button
          type="button"
          onClick={onGoogle}
          className="mt-2 w-full rounded-xl bg-paper/95 py-3 text-sm font-semibold text-ink"
        >
          {hi ? "Google से जारी रखें" : "Continue with Google"}
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
          }}
          className="mt-3 w-full text-center text-xs font-semibold text-mint"
        >
          {mode === "signin"
            ? hi
              ? "नया हैं? खाता बनाएँ"
              : "New here? Create an account"
            : hi
              ? "पहले से खाता है? लॉगिन करें"
              : "Already have an account? Sign in"}
        </button>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-0.5 rounded-xl bg-paper/95 px-3 py-2">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-ink/50">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm font-semibold text-ink outline-none"
      />
    </label>
  );
}
