"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "../../components/shared/animations";

export default function AboutSection() {
  return (
    <section id="about" className="py-28 px-8 max-w-275 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* Left — Text */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <motion.p
            className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-4 flex items-center gap-3"
            variants={staggerItemVariants}
          >
            <span className="inline-block w-6 h-px bg-amber-500" />
            About
          </motion.p>

          <motion.h2
            className="font-playfair text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] mb-5"
            variants={staggerItemVariants}
          >
            Crafting code with
            <br />
            <span className="italic text-amber-500">purpose & precision.</span>
          </motion.h2>

          <motion.p
            className="text-gray-400 leading-[1.85] mb-5 font-light text-[0.95rem]"
            variants={staggerItemVariants}
          >
            I&apos;m a Software Engineer from the Philippines with a BS in
            Information Technology from the University of San Agustin and
            hands-on training from the Zuitt Tech Program.
          </motion.p>

          <motion.p
            className="text-gray-400 leading-[1.85] mb-5 font-light text-[0.95rem]"
            variants={staggerItemVariants}
          >
            I aim to continuously grow my skills in front-end and back-end
            development. My goal is to collaborate on innovative projects that
            push boundaries in design and functionality. Always eager to learn,
            I thrive in solving complex challenges through clean, efficient
            code.
          </motion.p>
        </motion.div>

        {/* Right — Profile Image */}
        <motion.div
          className="relative hidden md:flex items-center justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Decorative amber ring — slow spin */}
          <motion.div
            className="absolute w-105 h-105 rounded-full"
            style={{
              border: "1px solid rgba(245,158,11,0.2)",
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            animate={{ rotate: 360 }}
            // override whileInView animate with continuous rotation via separate motion value
          />

          {/* Outer dashed orbit — counter-spin */}
          <motion.div
            className="absolute w-115 h-115 rounded-full"
            style={{
              border: "1px dashed rgba(245,158,11,0.1)",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          />

          {/* Amber glow blob behind image */}
          <motion.div
            className="absolute w-72 h-72 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
              filter: "blur(32px)",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
          />

          {/* Corner accent — top right */}
          <motion.div
            className="absolute top-4 right-10 w-12 h-12"
            style={{
              borderTop: "1.5px solid rgba(245,158,11,0.5)",
              borderRight: "1.5px solid rgba(245,158,11,0.5)",
            }}
            initial={{ opacity: 0, x: 10, y: -10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          />

          {/* Corner accent — bottom left */}
          <motion.div
            className="absolute bottom-4 left-10 w-12 h-12"
            style={{
              borderBottom: "1.5px solid rgba(245,158,11,0.5)",
              borderLeft: "1.5px solid rgba(245,158,11,0.5)",
            }}
            initial={{ opacity: 0, x: -10, y: 10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          />

          {/* Image container */}
          <motion.div
            className="relative w-72 h-104 overflow-hidden"
            style={{
              clipPath: "polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)",
            }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
          >
            {/* Amber tint overlay on hover */}
            <motion.div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(160deg, rgba(245,158,11,0.15) 0%, transparent 60%)",
              }}
            />

            <Image
              src="/images/krian-lloyd-lerry.jpg"
              alt="Krian Lloyd Lerry"
              fill
              className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
              priority
            />
          </motion.div>

          {/* Floating label badge */}
          <motion.div
            className="absolute bottom-10 -left-2 bg-[#0f0e0c] border border-amber-500/20 px-4 py-2.5 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[0.7rem] tracking-[0.2em] uppercase text-gray-400">
              Krian Lloyd Lerry
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
