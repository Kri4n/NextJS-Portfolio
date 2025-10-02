"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import CSS directly

export default function AOSInit() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return null; // nothing to render, just runs init
}
