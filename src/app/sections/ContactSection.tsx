"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// shadcn/ui components
import { Button } from "@/components/ui/button";

// lucide-react icons
import { Mail, Linkedin, Github } from "lucide-react";
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from "../../shared/animations";

// ─── Utility Components ──────────────────────────────────────────────────────

function useSectionInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
}

function RevealSection({
  children,
  delay = 0,
  className = "",
  variants = fadeUpVariants,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variants?: Variants;
}) {
  const { ref, isInView } = useSectionInView();
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

const contactLinks = [
  {
    label: "Email",
    href: "https://mail.google.com/mail/u/0/?fs=1&to=lerrylloyd15@gmail.com&su=&body=&tf=cm",
    icon: <Mail className="w-4 h-4" />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/krian-lloyd-lerry-551a19324/",
    icon: <Linkedin className="w-4 h-4" />,
  },
  {
    label: "GitHub",
    href: "https://github.com/Kri4n/",
    icon: <Github className="w-4 h-4" />,
  },
];

// ─── Contact Button Component ─────────────────────────────────────────────────

function ContactButton({
  label,
  href,
  icon,
}: {
  label: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div variants={staggerItemVariants}>
      <motion.div
        whileHover={{
          y: -3,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
          },
        }}
        whileTap={{ scale: 0.97 }}
      >
        <Button variant="outline" asChild className="btn-contact">
          <a
            href={href}
            data-hover
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 no-underline"
          >
            <span className="opacity-60">{icon}</span>
            {label}
          </a>
        </Button>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export default function ContactSection() {
  return (
    <section id="contact" className="py-28 pb-20 px-8 max-w-275 mx-auto">
      <div className="h-20" />

      <RevealSection>
        <div className="text-center max-w-150 mx-auto">
          <p className="text-[0.75rem] tracking-[0.3em] uppercase text-amber-500 mb-6">
            Let&apos;s Connect
          </p>

          <h2 className="font-playfair text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] mb-6">
            Ready to build
            <br />
            <span className="italic text-amber-500">something great?</span>
          </h2>

          <p className="text-gray-500 mb-12 leading-relaxed font-light">
            Open to full-time roles, freelance projects, and exciting
            collaborations. Let&apos;s talk.
          </p>

          <motion.div
            className="flex justify-center gap-4 flex-wrap mb-12"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {contactLinks.map((link) => (
              <ContactButton
                key={link.label}
                label={link.label}
                href={link.href}
                icon={link.icon}
              />
            ))}
          </motion.div>
        </div>
      </RevealSection>
    </section>
  );
}
