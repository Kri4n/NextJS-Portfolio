"use client";

import { useState } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
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

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, y: -8, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -8,
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const mobileItemVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut", delay: i * 0.06 + 0.1 },
  }),
};

export default function Navbar({
  activeNav = "home",
  navItems = [],
  scrollTo = () => {},
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (item: string) => {
    scrollTo(item);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-1000 px-6 md:px-8 h-16 flex items-center justify-between border-b border-amber-500/10 backdrop-blur-md bg-[#0a0a0a]/85"
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Logo */}
        <motion.div
          className="font-playfair text-xl tracking-wide text-amber-500 flex items-center gap-1 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <span>KL</span>
          <span className="text-[#e8e3da]">.</span>
        </motion.div>

        {/* Desktop Nav Links — plain flex, no NavigationMenu wrapper */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((n, i) => (
            <motion.button
              key={n}
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
          ))}
        </div>

        {/* Desktop CTA */}
        <motion.div
          className="hidden md:block"
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

        {/* Mobile Hamburger */}
        <motion.button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.25 cursor-pointer bg-transparent border-none"
          onClick={() => setMobileOpen((prev) => !prev)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block h-px w-6 bg-amber-500 origin-center"
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <motion.span
            className="block h-px w-6 bg-amber-500 origin-center"
            animate={
              mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
            }
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-px w-6 bg-amber-500 origin-center"
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </motion.button>
      </motion.nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed top-16 left-0 right-0 z-999 bg-[#0a0a0a]/97 backdrop-blur-md border-b border-amber-500/10 md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navItems.map((n, i) => (
                <motion.button
                  key={n}
                  onClick={() => handleNav(n)}
                  className="font-dm-sans text-[0.8rem] uppercase tracking-[0.15em] bg-transparent border-none text-left py-3 border-b border-white/5 last:border-none"
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  style={{ color: activeNav === n ? "#f59e0b" : "#9ca3af" }}
                  whileHover={{ color: "#fbbf24", x: 6 }}
                  transition={{ duration: 0.2 }}
                >
                  {n}
                </motion.button>
              ))}

              {/* Mobile CTA */}
              <motion.div
                className="mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navItems.length * 0.06 + 0.2 }}
              >
                <Button
                  variant="outline"
                  onClick={() => handleNav("contact")}
                  className="hire-btn w-full"
                >
                  Hire Me
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
