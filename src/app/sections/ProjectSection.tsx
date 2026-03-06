"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data";
import { fadeUpVariants, projectRowVariants } from "../../shared/animations";

function ProjectRow({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <motion.div
      variants={projectRowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index * 0.12}
    >
      <motion.div
        data-hover
        className="project-row grid grid-cols-[80px_1fr_auto] gap-8 items-center py-10 border-b border-white/6"
        whileHover="hovered"
        initial="rest"
        animate="rest"
      >
        <motion.span
          className="font-playfair text-[3rem] text-amber-500/15 leading-none italic"
          variants={{
            rest: { color: "rgba(251,191,36,0.15)" },
            hovered: {
              color: "rgba(251,191,36,0.4)",
              transition: { duration: 0.3 },
            },
          }}
        >
          {project.num}
        </motion.span>

        <div>
          <div className="flex items-center gap-4 mb-2">
            <h3 className="text-[1.4rem] font-medium">{project.name}</h3>
            <Badge variant="outline" className="badge-project-tag">
              {project.tag}
            </Badge>
          </div>
          <p className="text-gray-500 text-[0.9rem] leading-relaxed max-w-130 font-light mb-4">
            {project.description}
          </p>
          <div className="flex gap-2 flex-wrap">
            {project.stack.map((s) => (
              <Badge key={s} variant="secondary" className="badge-stack">
                #{s}
              </Badge>
            ))}
          </div>
        </div>

        <motion.div
          variants={{
            rest: { x: 0 },
            hovered: {
              x: 4,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            },
          }}
        >
          <Button variant="outline" asChild className="btn-arrow">
            <a href={project.link} data-hover target="_blank">
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-28 px-8 max-w-275 mx-auto">
      {/* Heading */}
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

      {/* Project Rows */}
      <div className="flex flex-col">
        {projects.map((p, i) => (
          <ProjectRow key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
