"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const particlesConfig: ISourceOptions = {
  fpsLimit: 60,
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        width: 1920,
        height: 1080,
      },
    },
    color: {
      value: "#f59e0b",
    },
    opacity: {
      value: { min: 0.06, max: 0.18 },
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
      color: "#f59e0b",
      opacity: 0.07,
      distance: 150,
      width: 0.8,
    },
    move: {
      enable: true,
      speed: 0.45,
      direction: "none",
      random: true,
      straight: false,
      outModes: {
        default: "out",
      },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab",
      },
      onClick: {
        enable: false,
      },
      resize: {
        enable: true,
      },
    },
    modes: {
      grab: {
        distance: 160,
        links: {
          opacity: 0.28,
          color: "#f59e0b",
        },
      },
    },
  },
  detectRetina: true,
};

export default function ParticlesBackground() {
  const [ready, setReady] = useState(false);

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
      <Particles
        id="site-particles"
        options={particlesConfig}
        particlesLoaded={onLoaded}
        className="absolute inset-0 w-full h-full"
      />
    </motion.div>
  );
}
