import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) =>
      setHov((e.target as Element).closest("a,button,[data-hover]") !== null);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed w-2 h-2 bg-amber-500 rounded-full pointer-events-none z-9999"
        animate={{ left: pos.x - 4, top: pos.y - 4 }}
        transition={{ type: "spring", stiffness: 800, damping: 40, mass: 0.2 }}
      />
      <motion.div
        className="fixed w-10 h-10 border border-amber-500/50 rounded-full pointer-events-none z-9998"
        animate={{ left: pos.x - 20, top: pos.y - 20, scale: hov ? 1.6 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
      />
    </>
  );
}
