"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data";
import { fadeUpVariants } from "../../components/shared/animations";
import Image from "next/image";
import { useRef } from "react";

/* ─────────────────────────────────────────────
   Magnetic tilt card — each project lives here
───────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  /* Parallax tilt */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [4, -4]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-4, 4]), {
    stiffness: 200,
    damping: 30,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  }
  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        whileHover="hovered"
        initial="rest"
        animate="rest"
        className="relative group overflow-hidden rounded-sm border border-white/8 bg-[#0c0c0c] "
      >
        {/* ── Large index number watermark ── */}
        <span className="absolute top-4 right-5 font-mono text-[6rem] leading-none font-black text-white/4 select-none pointer-events-none z-0 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* ── Image block ── */}
        <div className="relative w-full h-56 overflow-hidden">
          {/* Amber wash fades on hover */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none bg-amber-500/25 mix-blend-multiply"
            variants={{
              rest: { opacity: 1 },
              hovered: { opacity: 0, transition: { duration: 0.45 } },
            }}
          />

          {/* Diagonal reveal bar */}
          <motion.div
            className="absolute inset-0 z-20 bg-[#0c0c0c] origin-left"
            variants={{
              rest: { scaleX: 0 },
              hovered: {
                scaleX: 0,
                transition: { duration: 0 },
              },
            }}
          />

          {/* Zoom */}
          <motion.div
            className="absolute inset-0"
            variants={{
              rest: { scale: 1 },
              hovered: {
                scale: 1.06,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
          >
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>

          {/* Bottom scrim */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-[#0c0c0c] to-transparent z-30" />

          {/* Tag pill — floats over image */}
          <div className="absolute top-4 left-4 z-40">
            <Badge
              variant="outline"
              className="text-[0.65rem] tracking-widest uppercase border-amber-500/50 text-amber-400 bg-black/60 backdrop-blur-sm px-2.5 py-0.5"
            >
              {project.tag}
            </Badge>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="relative z-10 px-6 pt-5 pb-6 flex flex-col gap-4">
          {/* Title row */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-playfair text-[1.35rem] leading-snug tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
              {project.name}
            </h3>

            {/* Arrow button */}
            <motion.div
              variants={{
                rest: { rotate: 0, scale: 1 },
                hovered: {
                  rotate: 45,
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 300, damping: 18 },
                },
              }}
              className="shrink-0 mt-0.5"
            >
              <Button
                variant="outline"
                size="icon"
                asChild
                className="w-8 h-8 rounded-full border-white/15 bg-transparent hover:bg-amber-500/10 hover:border-amber-500/50 transition-colors duration-300"
              >
                <a href={project.link} target="_blank" rel="noreferrer">
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Description */}
          <p className="text-white/40 text-xs leading-relaxed font-light line-clamp-2 group-hover:text-white/55 transition-colors duration-300">
            {project.description}
          </p>

          {/* Stack pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.stack.map((s, si) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 + si * 0.05, duration: 0.4 }}
                className="text-[0.6rem] tracking-widest uppercase text-white/30 border border-white/8 rounded-full px-2.5 py-0.5 group-hover:border-amber-500/25 group-hover:text-amber-400/60 transition-all duration-300"
              >
                {s}
              </motion.span>
            ))}
          </div>

          {/* Animated bottom line */}
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-amber-500/70"
            variants={{
              rest: { width: "0%" },
              hovered: {
                width: "100%",
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Section
───────────────────────────────────────────── */
export default function ProjectsSection() {
  return (
    <section id="projects" className="py-28 px-8 max-w-275 mx-auto">
      {/* ── Heading ── */}
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mb-16"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-4 flex items-center gap-3">
          <span className="inline-block w-6 h-px bg-amber-500" />
          Projects
        </p>
        <h2 className="font-playfair text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]">
          Selected <span className="italic text-amber-500">works</span>
        </h2>
      </motion.div>

      {/* ── Masonry-ish responsive grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
