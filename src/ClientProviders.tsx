"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function ClientProviders() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    AOS.init();
  }, []);

  return null; // doesn’t render anything
}
