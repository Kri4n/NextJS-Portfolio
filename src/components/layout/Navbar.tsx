"use client";

import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Code2 } from "lucide-react";
import { NavbarProps } from "../../types";

const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    color: "#9ca3af",
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.07 + 0.3 },
  }),
  active: (i: number) => ({
    opacity: 1,
    y: 0,
    color: "#f59e0b",
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.07 + 0.3 },
  }),
};

// ─── Navbar Component ─────────────────────────────────────────────────────────

export default function Navbar({
  activeNav = "home",
  navItems = [],
  scrollTo = () => {},
}: NavbarProps) {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-1000 px-8 h-16 flex items-center justify-between border-b border-amber-500/10 backdrop-blur-md bg-[#0a0a0a]/85"
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Logo */}
      <motion.div
        className="font-playfair text-xl tracking-wide text-amber-500 flex items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Code2 className="w-4 h-4 text-amber-500/60" />
        KL<span className="text-[#e8e3da]">.</span>
      </motion.div>

      {/* Nav Links */}
      <NavigationMenu className="nav-links">
        <NavigationMenuList className="gap-1">
          {navItems.map((n, i) => (
            <NavigationMenuItem key={n}>
              <motion.button
                data-hover
                onClick={() => scrollTo(n)}
                className="font-dm-sans text-[0.8rem] uppercase tracking-[0.15em] bg-transparent border-none cursor-none px-3 py-1.5"
                variants={navItemVariants}
                initial="hidden"
                animate={activeNav === n ? "active" : "visible"}
                custom={i}
                whileHover={{ color: "#fbbf24" }}
                transition={{ duration: 0.2 }}
              >
                {n}
              </motion.button>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <Button
          variant="outline"
          data-hover
          onClick={() => scrollTo("contact")}
          className="hire-btn"
        >
          Hire Me
        </Button>
      </motion.div>
    </motion.nav>
  );
}
