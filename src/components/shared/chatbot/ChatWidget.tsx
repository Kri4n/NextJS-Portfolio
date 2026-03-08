"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, RefreshCw, Clock } from "lucide-react";
import { ChatErrorProps, ErrorState, Message } from "@/types";
import TypingIndicator from "./TypingIndicator";
import FormattedMessage from "./FormattedMessage";

/* ─────────────────────────────────────────────
   ChatError
───────────────────────────────────────────── */
const isRetryable = (code?: string) =>
  code === "GEMINI_NETWORK" ||
  code === "GEMINI_UNKNOWN" ||
  code === "GEMINI_TIMEOUT" ||
  code === "UNKNOWN";

const isQuotaError = (code?: string) =>
  code === "RATE_LIMITED_IP" ||
  code === "RATE_LIMITED_GLOBAL" ||
  code === "GEMINI_QUOTA";

function ChatError({ message, code, onRetry }: ChatErrorProps) {
  const Icon = isQuotaError(code) ? Clock : AlertCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-red-500/8 border border-red-500/15 mx-1"
    >
      <Icon className="w-3 h-3 text-red-400/70 mt-0.5 shrink-0" />
      <div className="flex flex-col gap-1.5 min-w-0">
        <p className="font-mono text-[0.66rem] text-red-400/80 leading-relaxed">
          {message}
        </p>
        {isRetryable(code) && onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-1 font-mono text-[0.62rem] text-amber-400/60 hover:text-amber-400/90 transition-colors w-fit"
          >
            <RefreshCw className="w-2.5 h-2.5" />
            try again
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   ChatWidget
───────────────────────────────────────────── */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm kri4n.ai, Krian's personal assistant. Ask me anything about his experience, projects, or skills.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorState | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, error]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError({
          message: data.error ?? "Something went wrong.",
          code: data.code,
        });
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setError({
        message: "Network error. Please check your connection and try again.",
        code: "GEMINI_NETWORK",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-5 z-50 w-88 flex flex-col rounded-xl overflow-hidden border border-white/8 shadow-2xl shadow-black/60"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1e1e1e] border-b border-white/6">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-7 h-7 rounded-full bg-[#252525] border border-white/10 flex items-center justify-center">
                    <span className="font-mono text-[0.65rem] text-amber-400/80">
                      K
                    </span>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-[#1e1e1e]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[0.72rem] text-white/80 leading-none">
                    kri4n.ai
                  </span>
                  <span className="font-mono text-[0.58rem] text-emerald-400/70 mt-0.5">
                    online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/20 hover:text-white/60 transition-colors font-mono text-[0.75rem]"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="bg-[#1a1a1a] flex flex-col gap-3 px-4 py-4 h-80 overflow-y-auto">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-1 ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <span className="font-mono text-[0.58rem] text-white/20 px-1">
                    {msg.role === "user" ? "you" : "kri4n.ai"}
                  </span>
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-lg font-mono text-[0.72rem] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-amber-400/10 text-amber-100/80 border border-amber-400/15"
                        : "bg-[#252525] text-white/70 border border-white/6"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <FormattedMessage content={msg.content} />
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex flex-col gap-1 items-start">
                  <span className="font-mono text-[0.58rem] text-white/20 px-1">
                    kri4n.ai
                  </span>
                  <div className="bg-[#252525] border border-white/6 rounded-lg">
                    <TypingIndicator />
                  </div>
                </div>
              )}

              {error && (
                <ChatError
                  message={error.message}
                  code={error.code}
                  onRetry={sendMessage}
                />
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-3 bg-[#161616] border-t border-white/5">
              <div className="flex-1 flex items-center bg-[#222222] border border-white/8 rounded-lg px-3 py-2 gap-2 focus-within:border-amber-400/30 transition-colors">
                <span className="font-mono text-[0.68rem] text-amber-400/50 shrink-0">
                  ❯
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Krian..."
                  disabled={loading}
                  className="flex-1 bg-transparent font-mono text-[0.72rem] text-white/80 placeholder:text-white/20 outline-none disabled:opacity-50"
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400/70 hover:bg-amber-400/20 hover:text-amber-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 6h10M6 1l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-xl bg-[#1e1e1e] border border-white/10 flex items-center justify-center shadow-lg shadow-black/40 hover:border-amber-400/30 hover:bg-[#252525] transition-all group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              className="font-mono text-[0.75rem] text-white/40 group-hover:text-white/70"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="open"
              className="text-amber-400/70 group-hover:text-amber-400"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.15 }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 3.5A1.5 1.5 0 013.5 2h11A1.5 1.5 0 0116 3.5v8A1.5 1.5 0 0114.5 13H10l-4 3v-3H3.5A1.5 1.5 0 012 11.5v-8z"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>

        {!open && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0f0f0f]" />
        )}
      </motion.button>
    </>
  );
}
