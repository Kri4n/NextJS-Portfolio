"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitHubUser, Line, LineType, Segment } from "@/types";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

const t = (text: string, color: string): Segment => ({ text, color });
const flatten = (segments: Segment[]) => segments.map((s) => s.text).join("");

const CHAR_SPEED: Record<LineType, number> = {
  cmd: 28,
  output: 0,
  json: 0,
  git: 0,
  success: 0,
  warn: 0,
  error: 0,
  gap: 0,
};

const STATIC_LINES: Line[] = [
  {
    type: "cmd",
    segments: [
      t("curl ", "text-white/90"),
      t("-s ", "text-white/50"),
      t('"https://api.github.com/users/Kri4n"', "text-amber-300/90"),
    ],
    delay: 400,
  },
];

function buildGitHubLines(user: GitHubUser): Line[] {
  const accountYear = new Date(user.created_at).getFullYear();
  const lines: Line[] = [
    { type: "gap", segments: [], delay: 0 },
    { type: "json", segments: [t("{", "text-white/50")], delay: 0 },
    {
      type: "json",
      segments: [
        t('  "', "text-white/40"),
        t("login", "text-sky-400/90"),
        t('":     ', "text-white/40"),
        t(`"${user.login}"`, "text-emerald-400/80"),
      ],
      delay: 80,
    },
    {
      type: "json",
      segments: [
        t('  "', "text-white/40"),
        t("name", "text-sky-400/90"),
        t('":      ', "text-white/40"),
        t(`"${user.name || user.login}"`, "text-emerald-400/80"),
      ],
      delay: 160,
    },
    {
      type: "json",
      segments: [
        t('  "', "text-white/40"),
        t("location", "text-sky-400/90"),
        t('":  ', "text-white/40"),
        t(`"${user.location || "Philippines"}"`, "text-emerald-400/80"),
      ],
      delay: 240,
    },
    {
      type: "json",
      segments: [
        t('  "', "text-white/40"),
        t("repos", "text-sky-400/90"),
        t('":     ', "text-white/40"),
        t(`${user.public_repos}`, "text-amber-400/90"),
      ],
      delay: 320,
    },
    {
      type: "json",
      segments: [
        t('  "', "text-white/40"),
        t("followers", "text-sky-400/90"),
        t('":  ', "text-white/40"),
        t(`${user.followers}`, "text-amber-400/90"),
      ],
      delay: 400,
    },
    {
      type: "json",
      segments: [
        t('  "', "text-white/40"),
        t("member_since", "text-sky-400/90"),
        t('": ', "text-white/40"),
        t(`${accountYear}`, "text-amber-400/90"),
      ],
      delay: 480,
    },
    { type: "json", segments: [t("}", "text-white/50")], delay: 560 },
    { type: "gap", segments: [], delay: 640 },
  ];

  return lines;
}

/* ─────────────────────────────────────────────
   CLI Command Outputs
───────────────────────────────────────────── */

type CLIOutput =
  | { kind: "help" }
  | { kind: "hobbies" }
  | { kind: "whoami" }
  | { kind: "error"; cmd: string };

function HelpOutput() {
  const commands = [
    { cmd: "whoami", desc: "Display info about me" },
    { cmd: "cat hobbies.txt", desc: "List my hobbies" },
    { cmd: "help", desc: "Show available commands" },
    { cmd: "clear", desc: "Clear the terminal" },
  ];
  return (
    <div className="ml-2 mt-0.5 mb-1 font-mono text-[0.75rem] flex flex-col gap-0.5">
      <div className="text-white/30 mb-1">Available commands:</div>
      {commands.map(({ cmd, desc }) => (
        <div key={cmd} className="flex gap-3">
          <span className="text-sky-400/80 w-36 shrink-0">{cmd}</span>
          <span className="text-white/40">{desc}</span>
        </div>
      ))}
    </div>
  );
}

function HobbiesOutput() {
  const hobbies = [
    { icon: "🎮", label: "Gaming" },
    { icon: "🎬", label: "Watching Movies" },
    { icon: "🎵", label: "Listening to Music" },
    { icon: "💻", label: "Vibe Coding" },
    { icon: "✈️", label: "Travel" },
  ];
  return (
    <div className="ml-2 mt-0.5 mb-1 font-mono text-[0.75rem] flex flex-col gap-0.5">
      {hobbies.map(({ icon, label }) => (
        <div key={label} className="flex items-center gap-2">
          <span className="text-white/20">-</span>
          <span className="text-base leading-none">{icon}</span>
          <span className="text-emerald-400/80">{label}</span>
        </div>
      ))}
    </div>
  );
}

function WhoamiOutput() {
  return (
    <div className="ml-2 mt-0.5 mb-1 font-mono text-[0.75rem] flex flex-col gap-0.5">
      <div className="flex gap-3">
        <span className="text-sky-400/80 w-24 shrink-0">name</span>
        <span className="text-emerald-400/80">Krian</span>
      </div>
      <div className="flex gap-3">
        <span className="text-sky-400/80 w-24 shrink-0">role</span>
        <span className="text-emerald-400/80">Full-Stack Developer</span>
      </div>
      <div className="flex gap-3">
        <span className="text-sky-400/80 w-24 shrink-0">location</span>
        <span className="text-emerald-400/80">Philippines 🇵🇭</span>
      </div>
      <div className="flex gap-3">
        <span className="text-sky-400/80 w-24 shrink-0">focus</span>
        <span className="text-emerald-400/80">
          Building cool stuff on the web
        </span>
      </div>
      <div className="flex gap-3">
        <span className="text-sky-400/80 w-24 shrink-0">stack</span>
        <span className="text-emerald-400/80">
          React · Next.js · TypeScript · Node
        </span>
      </div>
    </div>
  );
}

function CLIOutputRenderer({ output }: { output: CLIOutput }) {
  if (output.kind === "help") return <HelpOutput />;
  if (output.kind === "hobbies") return <HobbiesOutput />;
  if (output.kind === "whoami") return <WhoamiOutput />;
  return (
    <div className="ml-2 font-mono text-[0.75rem] text-red-400/80">
      zsh: command not found: {output.cmd}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Spinner
───────────────────────────────────────────── */
const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
function Spinner() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setFrame((f) => (f + 1) % SPINNER_FRAMES.length),
      80,
    );
    return () => clearInterval(id);
  }, []);
  return (
    <span className="font-mono text-[0.75rem] text-amber-400/70 flex items-center gap-2">
      <span>{SPINNER_FRAMES[frame]}</span>
      <span className="text-white/30">fetching github profile...</span>
    </span>
  );
}

/* ─────────────────────────────────────────────
   TerminalLine
───────────────────────────────────────────── */
function TerminalLine({
  line,
  isLast,
  onDone,
}: {
  line: Line;
  isLast: boolean;
  onDone: () => void;
}) {
  const full = flatten(line.segments);
  const [charCount, setCharCount] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (line.type === "gap" || full.length === 0) {
      onDone();
      return;
    }
    const speed = CHAR_SPEED[line.type];

    if (speed === 0) {
      setCharCount(full.length);
      const id = setTimeout(onDone, 30);
      return () => clearTimeout(id);
    }

    let i = 0;
    const id = setInterval(() => {
      i++;
      setCharCount(i);
      if (i >= full.length) {
        clearInterval(id);
        if (!doneRef.current) {
          doneRef.current = true;
          setTimeout(onDone, 120);
        }
      }
    }, speed);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSegments = () => {
    let remaining = charCount;
    return line.segments.map((seg, si) => {
      if (remaining <= 0) return null;
      const visible = seg.text.slice(0, remaining);
      remaining -= seg.text.length;
      return (
        <span key={si} className={seg.color}>
          {visible}
        </span>
      );
    });
  };

  if (line.type === "gap") return <div className="h-2" />;
  return (
    <motion.div
      className="flex items-start min-h-[1.4rem]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
    >
      {line.type === "cmd" ? (
        <span className="shrink-0 mr-2 select-none flex items-center gap-1">
          <span className="text-emerald-400/70 text-[0.72rem]">
            ~/Documents/portfolio
          </span>
          <span className="text-blue-300 text-[0.72rem]"> (main)</span>
          <span className="text-amber-400/80 text-[0.72rem]"> ❯</span>
        </span>
      ) : (
        <span className="w-2 shrink-0" />
      )}
      <span className="font-mono text-[0.75rem] leading-[1.6] tracking-wide break-all">
        {renderSegments()}
        {isLast && line.type === "cmd" && charCount < full.length && (
          <span className="inline-block w-1.75 h-3.25 bg-amber-400/80 animate-pulse align-middle ml-px rounded-[1px]" />
        )}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Prompt Row
───────────────────────────────────────────── */
function PromptRow({ cmd }: { cmd: string }) {
  return (
    <div className="flex items-center gap-1 font-mono text-[0.75rem]">
      <span className="text-emerald-400/70">~/Documents/portfolio</span>
      <span className="text-blue-300"> (main)</span>
      <span className="text-amber-400/80"> ❯</span>
      <span className="text-white ml-1">{cmd}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HeroTerminal (Interactive)
───────────────────────────────────────────── */
export default function HeroTerminal() {
  const [phase, setPhase] = useState<"static" | "fetching" | "done" | "error">(
    "static",
  );
  const [dynamicLines, setDynamicLines] = useState<Line[]>([]);
  const [visibleStatic, setVisibleStatic] = useState<number[]>([]);
  const [visibleDynamic, setVisibleDynamic] = useState<number[]>([]);
  const [, setCompletedStatic] = useState<Set<number>>(new Set());
  const [finished, setFinished] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [key] = useState(0);
  const [cmdTyped, setCmdTyped] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Interactive CLI
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ cmd: string; output: CLIOutput }[]>(
    [],
  );

  const fetchResultRef = useRef<{ lines: Line[] } | { error: string } | null>(
    null,
  );

  /* Fetch GitHub */
  useEffect(() => {
    fetchResultRef.current = null;
    const controller = new AbortController();

    fetch("https://api.github.com/users/Kri4n", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        return res.json();
      })
      .then((user: GitHubUser) => {
        fetchResultRef.current = { lines: buildGitHubLines(user) };
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        fetchResultRef.current = {
          error: "curl: (6) Could not resolve host: api.github.com",
        };
      });

    return () => controller.abort();
  }, [key]);

  /* Static lines animation */
  useEffect(() => {
    const staticTimers = STATIC_LINES.map((line, i) =>
      setTimeout(
        () => setVisibleStatic((prev) => [...prev, i]),
        line.delay + 16,
      ),
    );
    return () => staticTimers.forEach(clearTimeout);
  }, [key]);

  /* Once curl finishes typing → spinner → apply result */
  useEffect(() => {
    if (!cmdTyped) return;

    let pollTimer: ReturnType<typeof setTimeout>;

    const applyResult = () => {
      const result = fetchResultRef.current;
      if (!result) {
        pollTimer = setTimeout(applyResult, 100);
        return;
      }
      if ("error" in result) {
        setErrorMsg(result.error);
        setPhase("error");
        setTimeout(() => setFinished(true), 200);
        return;
      }
      const { lines } = result;
      setDynamicLines(lines);
      setPhase("done");
      lines.forEach((line, i) => {
        setTimeout(() => setVisibleDynamic((prev) => [...prev, i]), line.delay);
      });
      setTimeout(() => setFinished(true), 200);
    };

    const enterId = setTimeout(() => {
      setPhase("fetching");
      pollTimer = setTimeout(applyResult, 800);
    }, 180);

    return () => {
      clearTimeout(enterId);
      clearTimeout(pollTimer);
    };
  }, [cmdTyped]);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [visibleStatic, visibleDynamic, history, input, finished]);

  const markStaticDone = useCallback((index: number) => {
    setCompletedStatic((prev) => {
      const next = new Set(prev);
      next.add(index);
      if (next.size === STATIC_LINES.length) setCmdTyped(true);
      return next;
    });
  }, []);

  /* Resolve command to output */
  const resolveCommand = (cmd: string): CLIOutput | null => {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed === "help") return { kind: "help" };
    if (trimmed === "cat hobbies.txt") return { kind: "hobbies" };
    if (trimmed === "whoami") return { kind: "whoami" };
    if (trimmed === "clear") return null; // handled separately
    return { kind: "error", cmd: cmd.trim() };
  };

  /* Interactive typing */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.key === "Enter") {
      if (!input.trim()) return;
      const cmd = input.trim();
      setInput("");
      if (cmd.toLowerCase() === "clear") {
        setHistory([]);
      } else {
        const output = resolveCommand(cmd) ?? { kind: "error", cmd };
        setHistory((prev) => [...prev, { cmd, output }]);
      }
    } else if (e.key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else if (e.key.length === 1) {
      setInput((prev) => prev + e.key);
    }
  };

  useEffect(() => scrollRef.current?.focus(), []);

  return (
    <motion.div
      className="relative w-full max-w-130"
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative rounded-xl overflow-hidden border border-white/8">
        {/* Title bar */}
        <div className="relative flex items-center px-4 h-10 bg-[#1e1e1e] border-b border-white/6">
          <div className="flex items-center gap-1.5 z-10">
            <div className="group w-3 h-3 rounded-full bg-[#ff5f57] flex items-center justify-center cursor-pointer hover:brightness-110 transition-all">
              <span className="text-[#7a1f1a] text-[8px] font-bold opacity-0 group-hover:opacity-100">
                ✕
              </span>
            </div>
            <div className="group w-3 h-3 rounded-full bg-[#febc2e] flex items-center justify-center cursor-pointer hover:brightness-110 transition-all">
              <span className="text-[#7a5a00] text-[8px] font-bold opacity-0 group-hover:opacity-100">
                −
              </span>
            </div>
            <div className="group w-3 h-3 rounded-full bg-[#28c840] flex items-center justify-center cursor-pointer hover:brightness-110 transition-all">
              <span className="text-[#0a4a18] text-[8px] font-bold opacity-0 group-hover:opacity-100">
                +
              </span>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-mono text-[0.65rem] text-white/30 tracking-wide select-none">
              krian@MacBook-Pro — zsh — 82×24
            </span>
          </div>
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="bg-[#1a1a1a] px-4 pt-3 pb-4 h-75 overflow-y-auto flex flex-col gap-px outline-none"
        >
          <div className="sticky top-0 h-4 bg-linear-to-b from-[#1a1a1a] to-transparent pointer-events-none -mt-3 mb-1 z-10" />

          {/* Static Lines */}
          <AnimatePresence>
            {visibleStatic.map((lineIndex, arrIndex) => (
              <TerminalLine
                key={`static-${key}-${lineIndex}`}
                line={STATIC_LINES[lineIndex]}
                isLast={
                  phase === "static" && arrIndex === visibleStatic.length - 1
                }
                onDone={() => markStaticDone(lineIndex)}
              />
            ))}
          </AnimatePresence>

          {/* Spinner */}
          <AnimatePresence>
            {phase === "fetching" && (
              <motion.div
                className="ml-2 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Spinner />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          {phase === "error" && (
            <motion.div
              className="ml-2 mt-1 font-mono text-[0.75rem] text-red-400/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {errorMsg}
            </motion.div>
          )}

          {/* Dynamic Lines */}
          <AnimatePresence>
            {visibleDynamic.map((lineIndex, arrIndex) => (
              <TerminalLine
                key={`dynamic-${key}-${lineIndex}`}
                line={dynamicLines[lineIndex]}
                isLast={arrIndex === visibleDynamic.length - 1}
                onDone={() => {}}
              />
            ))}
          </AnimatePresence>

          {/* Help hint */}
          {finished &&
            phase !== "static" &&
            phase !== "fetching" &&
            history.length === 0 && (
              <div className="ml-2 mb-1 font-mono text-[0.72rem] text-white/20 italic">
                type <span className="text-amber-400/50 not-italic">help</span>{" "}
                to see available commands
              </div>
            )}

          {/* CLI History */}
          {history.map((entry, i) => (
            <div key={i} className="flex flex-col">
              <PromptRow cmd={entry.cmd} />
              <CLIOutputRenderer output={entry.output} />
            </div>
          ))}

          {/* Input Line */}
          {finished && phase !== "static" && phase !== "fetching" && (
            <motion.div
              className="font-mono text-[0.75rem] flex gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-1 font-mono text-[0.75rem]">
                <span className="text-emerald-400/70">
                  ~/Documents/portfolio
                </span>
                <span className="text-blue-300"> (main)</span>
                <span className="text-amber-400/80"> ❯</span>
              </div>
              <div className="flex items-center">
                <span>{input}</span>
                <span className="inline-block w-1 h-3.25 bg-amber-400/70 animate-[blink_1.1s_step-end_infinite] align-middle ml-0.5 rounded-[1px]" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-[#161616] border-t border-white/5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.58rem] text-white/20">
              zsh 5.9
            </span>
            <span className="text-white/10">·</span>
            <span className="font-mono text-[0.58rem] text-white/20">
              node v20.11.0
            </span>
            <span className="text-white/10">·</span>
            <span className="font-mono text-[0.58rem] text-white/20">
              utf-8
            </span>
          </div>
          <motion.span
            className="font-mono text-[0.58rem]"
            animate={{
              color:
                phase === "error"
                  ? "#f87171"
                  : finished
                    ? "#6ee7b7"
                    : "#f59e0b",
            }}
            transition={{ duration: 0.4 }}
          >
            {phase === "error" ? "● error" : finished ? "● ready" : "● running"}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
