"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, type Variants } from "framer-motion";

// shadcn/ui components
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// lucide-react icons
import { Briefcase, MapPin, Diamond, GraduationCap, Code2 } from "lucide-react";
import {
  scaleInVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from "../../components/shared/animations";

// ─── Utility Components (could be moved to a shared utils file) ──────────────

function useSectionInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-4 flex items-center gap-3">
      <span className="inline-block w-6 h-px bg-amber-500" />
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-playfair text-[clamp(2rem,4vw,3.5rem)] mb-16 leading-[1.1]">
      {children}
    </h2>
  );
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

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

// ─── Data ────────────────────────────────────────────────────────────────────

const experience = [
  {
    company: "Archangel Technologies, Inc.",
    role: "Software Developer",
    type: "Full-Time",
    period: "May 2025 – Present",
    location: "Mandaluyong City, Philippines",
    current: true,
    highlights: [
      "Collaborated with cross-functional teams to test and resolve user-reported issues from multiple clients in an employee timekeeping with VPN connection cross-platform application.",
      "Implemented new features like a version checker with automated updates, remember me on login and login with biometrics using fingerprint.",
      "Deployed an iOS app for internal testing using TestFlight in app store connect and also on app store for production.",
      "Set up and managed separate development, staging, and production environments for multiple clients to ensure stable deployments and minimize production issues.",
      "Optimized and Improved the API response time for getting the date and time by approximately 60–70%.",
    ],
  },
  {
    company: "U&I Global",
    role: "Freelance Web Developer",
    type: "Project-Based",
    period: "November 2024 – April 2025",
    location: "Brisbane, Australia (Remote)",
    current: false,
    highlights: [
      "Re-engineered the U&I Global Expo website, improving UX and consultation booking flow",
      "Implemented modern responsive design using React and Tailwind CSS",
      "Optimized performance with SPA architecture for faster navigation",
    ],
  },
];

// ─── Experience Card Component ────────────────────────────────────────────────

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experience)[0];
  index: number;
}) {
  return (
    <RevealSection delay={index * 0.15} variants={scaleInVariants}>
      <motion.div
        whileHover={{
          y: -2,
          transition: { type: "spring", stiffness: 300, damping: 25 },
        }}
      >
        <Card className="exp-card">
          <div
            className={`absolute top-0 left-0 w-full h-0.5 ${
              exp.current ? "bg-amber-500" : "bg-amber-500/25"
            }`}
          />
          <CardContent className="p-10">
            <div className="flex justify-between items-start flex-wrap gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="w-4 h-4 text-amber-500/60" />
                  <h3 className="text-[1.2rem] font-semibold text-white">
                    {exp.role}
                  </h3>
                  {exp.current && (
                    <motion.span
                      className="w-2 h-2 rounded-full bg-emerald-400"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </div>
                <p className="text-amber-500 text-[0.9rem]">{exp.company}</p>
              </div>
              <div className="text-right flex flex-col items-end gap-1.5">
                <p className="text-[0.8rem] text-gray-400">{exp.period}</p>
                <Badge variant="outline" className="badge-emp-type">
                  {exp.type}
                </Badge>
              </div>
            </div>

            <p className="text-[0.75rem] text-gray-600 mb-6 tracking-wide flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              {exp.location}
            </p>

            <motion.ul
              className="list-none flex flex-col gap-2.5"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {exp.highlights.map((h, j) => (
                <motion.li
                  key={j}
                  className="flex items-start gap-3 text-[0.875rem] text-gray-400 font-light leading-relaxed"
                  variants={staggerItemVariants}
                >
                  <Diamond className="w-2 h-2 text-amber-500 mt-1.5 shrink-0 fill-amber-500" />
                  {h}
                </motion.li>
              ))}
            </motion.ul>
          </CardContent>
        </Card>
      </motion.div>
    </RevealSection>
  );
}

// ─── Education Card Component ─────────────────────────────────────────────────

function EducationCard() {
  return (
    <RevealSection delay={0.2} variants={scaleInVariants}>
      <Card className="edu-card">
        <CardContent className="p-8 edu-grid grid grid-cols-2 gap-6">
          <div>
            <p className="text-[0.65rem] tracking-[0.25em] uppercase text-amber-500 mb-3 flex items-center gap-2">
              <GraduationCap className="w-3 h-3" />
              COLLEGE
            </p>
            <h4 className="text-base text-gray-500 font-medium mb-1">
              University of San Agustin
            </h4>
            <p className="text-[0.85rem] text-gray-500">
              BS Information Technology · Sept 2020 – June 2024
            </p>
          </div>
          <div className="border-l border-white/6 pl-6">
            <p className="text-[0.65rem] tracking-[0.25em] uppercase text-amber-500 mb-3 flex items-center gap-2">
              <Code2 className="w-3 h-3" />
              Bootcamp
            </p>
            <h4 className="text-base font-medium mb-1 text-gray-500 ">
              Zuitt Tech Program
            </h4>
            <p className="text-[0.85rem] text-gray-500">
              Main Course Package · Sept 2024 – Jan 2025
            </p>
          </div>
        </CardContent>
      </Card>
    </RevealSection>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-28 px-8 max-w-275 mx-auto">
      <RevealSection>
        <SectionLabel>Experience</SectionLabel>
        <SectionHeading>
          Where I&apos;ve{" "}
          <span className="italic text-amber-500">contributed</span>
        </SectionHeading>
      </RevealSection>

      <div className="flex flex-col gap-8">
        {experience.map((exp, i) => (
          <ExperienceCard key={exp.company} exp={exp} index={i} />
        ))}

        <EducationCard />
      </div>
    </section>
  );
}
