import { createFileRoute } from "@tanstack/react-router";

type Msg = { role: "user" | "assistant"; content: string };

type Body = {
  messages?: Msg[];
  lang?: "hi" | "en";
  context?: string;
};

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as Body;
        const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
        if (messages.length === 0) {
          return new Response(JSON.stringify({ error: "No messages" }), { status: 400 });
        }

        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) {
          return new Response(JSON.stringify({ error: "AI is not configured" }), { status: 500 });
        }

        const lang = body.lang === "en" ? "en" : "hi";
        const system = [
          "You are GramBiz AI, a friendly business advisor for rural Indian users (SIH problem 26091).",
          "You help people decide WHICH small business to start and WHERE, using local demand, competition, investment, profit, market trends and shop rent.",
          "Give short, practical answers in simple words. Use ₹ amounts, monthly profit, payback time and a clear recommendation.",
          "Avoid jargon. Use at most 5 short bullet points.",
          lang === "hi"
            ? "Reply in simple Hindi (Devanagari script). Keep English words only where villagers commonly use them."
            : "Reply in simple English.",
          body.context ? `Current user context: ${body.context}` : "",
        ]
          .filter(Boolean)
          .join(" ");

        try {
          const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Lovable-API-Key": apiKey,
              "X-Lovable-AIG-SDK": "fetch",
            },
            body: JSON.stringify({
              model: "google/gemini-3.8-flash",
              messages: [{ role: "system", content: system }, ...messages],
            }),
          });

          if (!res.ok) {
            const text = await res.text();
            return new Response(JSON.stringify({ error: text || "AI request failed" }), {
              status: res.status,
              headers: { "content-type": "application/json" },
            });
          }

          const data = (await res.json()) as {
            choices?: Array<{ message?: { content?: string } }>;
          };
          const reply = data.choices?.[0]?.message?.content ?? "";
          return new Response(JSON.stringify({ reply }), {
            headers: { "content-type": "application/json" },
          });
        } catch (error) {
          console.error(error);
          return new Response(JSON.stringify({ error: "AI request failed" }), { status: 502 });
        }
      },
    },
  },
});
