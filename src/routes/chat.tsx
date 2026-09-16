import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useAppState, useVillage } from "@/lib/app-state";
import { getBusinesses, formatRupees } from "@/lib/grambiz-data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Ask GramBiz AI — business chatbot in Hindi & English" },
      {
        name: "description",
        content:
          "Ask the GramBiz AI assistant which business to start in your village, how much to invest and how much you can earn.",
      },
      { property: "og:title", content: "Ask GramBiz AI — business chatbot" },
      {
        property: "og:description",
        content: "A Hindi and English AI assistant for rural business decisions.",
      },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const suggestions = {
  hi: ["कम पैसे में क्या शुरू करूँ?", "यहाँ लोग क्या खरीदते हैं?", "दुकान कितनी बड़ी चाहिए?"],
  en: ["What can I start with little money?", "What do people buy here?", "How big a shop do I need?"],
};

function ChatPage() {
  const { lang, tr } = useLang();
  const village = useVillage();
  const { budget } = useAppState();
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        lang === "hi"
          ? "नमस्ते! मैं GramBiz AI हूँ। बताइए आपके गाँव में कौन सा धंधा शुरू करना है?"
          : "Hello! I'm GramBiz AI. Tell me what business you're thinking of starting.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const picks = getBusinesses(village.id).slice(0, 6);
  const context = [
    `Village: ${village.name.en} (${village.district.en}, ${village.stateName.en}), population ${village.population}, demand score ${village.demandScore}/100, ${village.existingShops} existing shops.`,
    `User budget: ${formatRupees(budget)}.`,
    `Local options: ${picks
      .map(
        (b) =>
          `${b.name.en} — invest ${formatRupees(b.investment)}, profit ${formatRupees(b.profit)}/month, competition ${b.competition}`,
      )
      .join("; ")}.`,
  ].join(" ");

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, lang, context }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok || !data.reply) throw new Error(data.error ?? "failed");
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: tr("chatError") }]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: "smooth" }));
    }
  }

  return (
    <div className="flex min-h-[70vh] flex-col gap-3">
      <div className="panel-light flex-1 rounded-2xl p-3">
        <div className="flex items-center gap-2 border-b border-ink/10 pb-2">
          <span className="grid size-8 place-items-center rounded-lg bg-mint/25 font-display text-mint-deep">
            ग
          </span>
          <p className="font-display text-[15px] tracking-wide text-sign">{tr("aiHelp")}</p>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "ml-auto rounded-br-md bg-sign text-paper"
                  : "rounded-bl-md bg-paper text-ink"
              }`}
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="max-w-[70%] animate-pulse rounded-2xl rounded-bl-md bg-paper px-3.5 py-2.5 text-sm text-ink/60">
              {tr("thinking")}
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {suggestions[lang].map((s) => (
            <button
              key={s}
              onClick={() => void send(s)}
              className="rounded-full bg-mint/20 px-3 py-1.5 text-xs font-medium text-mint-deep"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
        className="panel-dark sticky bottom-20 flex items-center gap-2 rounded-2xl p-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={tr("askPlaceholder")}
          className="min-w-0 flex-1 rounded-xl bg-paper/95 px-3 py-2.5 text-sm text-ink outline-none"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-xl bg-amber px-4 py-2.5 font-display text-sm tracking-wide text-sign-deep disabled:opacity-50"
        >
          {tr("send")}
        </button>
      </form>
    </div>
  );
}
