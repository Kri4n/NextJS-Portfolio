"use client";

import { useState, useEffect } from "react";

import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/app/sections/HeroSection";
import AboutSection from "@/app/sections/AboutSection";
import SkillsSection from "@/app/sections/SkillsSection";
import ProjectsSection from "@/app/sections/ProjectSection";
import ExperienceSection from "@/app/sections/ExperienceSection";
import ContactSection from "@/app/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/shared/Cursor";
import { NAV_ITEMS } from "../data";
import ParticlesBackground from "@/components/shared/ParticlesBackground";
import ChatWidget from "@/components/shared/chatbot/ChatWidget";

function Divider() {
  return (
    <div className="max-w-275 mx-auto px-8">
      <div className="h-px divider-gradient" />
    </div>
  );
}

export default function Home() {
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => {
    const sections = NAV_ITEMS.map((id) => document.getElementById(id)).filter(
      Boolean,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveNav(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el!));
    return () => observer.disconnect();
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative">
      <ParticlesBackground />
      <Cursor />
      <Navbar activeNav={activeNav} navItems={NAV_ITEMS} scrollTo={scrollTo} />
      <HeroSection scrollTo={scrollTo} />
      <AboutSection />
      <Divider />
      <SkillsSection />
      <Divider />
      <ProjectsSection />
      <Divider />
      <ExperienceSection />
      <Divider />
      <ContactSection />
      <Footer />
      <ChatWidget />
    </main>
  );
}
