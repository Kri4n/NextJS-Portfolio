"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

function buildParticlesConfig(isDark: boolean): ISourceOptions {
  const color = isDark ? "#f59e0b" : "#b45309";
  const linkOpacity = isDark ? 0.07 : 0.12;
  const particleOpacity = isDark
    ? { min: 0.06, max: 0.18 }
    : { min: 0.12, max: 0.3 };
  const grabOpacity = isDark ? 0.28 : 0.45;

  return {
    fpsLimit: 60,
    particles: {
      number: {
        value: 150,
        density: {
          enable: true,
          width: 1920,
          height: 1080,
        },
      },
      color: { value: color },
      opacity: {
        value: particleOpacity,
        animation: {
          enable: true,
          speed: 0.6,
          sync: false,
        },
      },
      size: {
        value: { min: 0.8, max: 1.6 },
      },
      links: {
        enable: true,
        color,
        opacity: linkOpacity,
        distance: 150,
        width: 0.8,
      },
      move: {
        enable: true,
        speed: 0.45,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: false },
        resize: { enable: true },
      },
      modes: {
        grab: {
          distance: 160,
          links: { opacity: grabOpacity, color },
        },
      },
    },
    detectRetina: true,
  };
}

export default function ParticlesBackground() {
  const [ready, setReady] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Detect and track color scheme preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const onLoaded = useCallback(async () => {}, []);

  if (!ready) return null;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5, ease: "easeIn" }}
    >
      {/*
        Key on isDark forces tsparticles to fully remount when the
        color scheme changes, so the new config is picked up cleanly.
      */}
      <Particles
        key={isDark ? "dark" : "light"}
        id="site-particles"
        options={buildParticlesConfig(isDark)}
        particlesLoaded={onLoaded}
        className="absolute inset-0 w-full h-full"
      />
    </motion.div>
  );
}