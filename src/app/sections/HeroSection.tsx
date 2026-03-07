"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileUser } from "lucide-react";
import { HeroSectionProps } from "../../types";
import { heroTitleVariants } from "../../shared/animations";
import Link from "next/link";
import ScrollIndicator from "@/components/custom/ScrollIndicator";
import HeroTerminal from "@/components/custom/Terminal";

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  const [typed, setTyped] = useState("");
  const fullText = "Software Engineer / Developer";

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

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
      className="min-h-screen flex justify-center items-center pt-24 pb-16 mx-8 relative overflow-hidden"
    >
      <motion.div
        className="max-w-275 mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* ── Left — text content ── */}
        <div>
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

          <div className="overflow">
            <motion.h1
              className="font-playfair text-[clamp(3rem,7vw,6rem)] leading-[0.95] mb-1 tracking-tight"
              variants={heroTitleVariants}
              initial="hidden"
              animate="visible"
              custom={0.2}
            >
              Krian
              <span className="text-amber-500 pl-4">Lloyd</span>
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
              Building user-friendly applications that makes life easier, one
              line of code at a time.
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
        </div>

        {/* ── Right — interactive terminal ── */}
        <div className="hidden lg:flex justify-center xl:justify-end">
          <HeroTerminal />
        </div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
