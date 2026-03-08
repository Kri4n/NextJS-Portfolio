"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skills } from "@/data";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "../../components/shared/animations";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-28 px-8 max-w-275 mx-auto">
      {/* Heading */}
      <motion.div
        className="mb-16"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p
          className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-4 flex items-center gap-3"
          variants={staggerItemVariants}
        >
          <span className="inline-block w-6 h-px bg-amber-500" />
          Skills
        </motion.p>

        <motion.h2
          className="font-playfair text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]"
          variants={staggerItemVariants}
        >
          The <span className="italic text-amber-500">tech</span> I wield
        </motion.h2>
      </motion.div>

      {/* Skill Cards */}
      <motion.div
        className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {Object.entries(skills).map(([cat, items]) => (
          <motion.div key={cat} variants={staggerItemVariants}>
            <motion.div
              whileHover={{
                y: -4,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className="h-full"
            >
              <Card className="skill-card h-full">
                <CardHeader className="px-6 pt-6 pb-3">
                  <p className="text-[0.7rem] tracking-[0.25em] uppercase text-amber-500">
                    {cat}
                  </p>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="skill-badge"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
