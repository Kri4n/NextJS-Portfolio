"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, FileUser } from "lucide-react";
import { HeroSectionProps } from "../../types";
import { heroTitleVariants } from "../../shared/animations";
import Link from "next/link";

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  const [typed, setTyped] = useState("");
  const fullText = "Software Developer";

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(id);
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-24 pb-16 px-8 relative overflow-hidden"
    >
      {/* Grid background */}
      <div className="hero-grid absolute inset-0 pointer-events-none" />
      {/* Glow blob */}
      <div className="hero-glow absolute top-[20%] left-[60%] w-150 h-150 pointer-events-none" />

      <motion.div
        className="max-w-275 mx-auto w-full"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <motion.p
          className="text-[0.8rem] tracking-[0.3em] uppercase text-amber-500 mb-6 flex items-center gap-3"
          variants={heroTitleVariants}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          <span className="inline-block w-8 h-px bg-amber-500" />
          Available for opportunities
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            className="font-playfair text-[clamp(3.5rem,9vw,8rem)] leading-[0.95] mb-1 tracking-tight"
            variants={heroTitleVariants}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            Krian
            <span className="text-amber-500 pl-6">Lloyd</span>
          </motion.h1>
        </div>

        <motion.div
          variants={heroTitleVariants}
          initial="hidden"
          animate="visible"
          custom={0.35}
        >
          <p className="text-[clamp(1.1rem,2vw,1.4rem)] text-gray-400 mb-2 font-light">
            <span className="text-[#e8e3da]">{typed}</span>
            <span className="animate-blink text-amber-500">|</span>
          </p>
          <p className="text-[0.95rem] text-gray-500 max-w-125 leading-relaxed mb-12 font-light">
            Building user-friendly applications that makes life easier, one line
            of code at a time.
          </p>
        </motion.div>

        <motion.div
          className="flex gap-4 flex-wrap"
          variants={heroTitleVariants}
          initial="hidden"
          animate="visible"
          custom={0.5}
        >
          <Button
            data-hover
            onClick={() => scrollTo("projects")}
            className="btn-primary px-10 py-3.5 group"
          >
            View Projects
            <motion.span
              className="ml-2 inline-block"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Button>
          <Link href="/docs/Resume_Lerry.pdf" target="_blank">
            <Button
              variant="outline"
              data-hover
              className="btn-outline-hero px-10 py-3.5 group"
            >
              Resume
              <FileUser className="ml-2 w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-[0.65rem] tracking-[0.25em] uppercase text-gray-600">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
