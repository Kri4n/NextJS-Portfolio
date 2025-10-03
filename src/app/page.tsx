"use client";

import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

import AboutMeSection from "@/components/AboutMeSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LandingSection from "@/components/LandingSection";
import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";
import ToolsSection from "@/components/ToolsSection";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Navbar />
      <LandingSection />
      <ProjectsSection />
      <AboutMeSection />
      <ToolsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
