"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { stats } from "@/data";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "../../shared/animations";

export default function AboutSection() {
  return (
    <section id="about" className="py-28 px-8 max-w-275 mx-auto">
      <div className="about-grid grid grid-cols-2 gap-20 items-center">
        {/* Left — Text */}
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-4 flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-amber-500" />
            About
          </p>
          <h2 className="font-playfair text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] mb-8">
            Crafting code with
            <br />
            <span className="italic text-amber-500">purpose & precision.</span>
          </h2>
          <p className="text-gray-400 leading-[1.85] mb-5 font-light text-[0.95rem]">
            I&apos;m a Software Developer from the Philippines with a BS in
            Information Technology from the University of San Agustin and
            hands-on training from the Zuitt Tech Program.
          </p>
          <p className="text-gray-400 leading-[1.85] mb-5 font-light text-[0.95rem]">
            I aim to continuously grow my skills in front-end and back-end
            development. My goal is to collaborate on innovative projects that
            push boundaries in design and functionality. Always eager to learn,
            I thrive in solving complex challenges through clean, efficient
            code.
          </p>
        </div>

        {/* Right — Stat Cards */}
        <motion.div
          className="grid grid-cols-2 gap-6"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map(({ val, label }) => (
            <motion.div key={label} variants={staggerItemVariants}>
              <motion.div
                whileHover={{
                  y: -4,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <Card className="stat-card">
                  <div className="absolute top-0 left-0 w-0.75 h-full bg-amber-500" />
                  <CardContent className="p-7">
                    <p className="font-playfair text-[2.5rem] text-amber-500 leading-none">
                      {val}
                    </p>
                    <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">
                      {label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
