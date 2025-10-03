"use client";

import AboutMeSection from "@/components/AboutMeSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LandingSection from "@/components/LandingSection";
import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";
import ToolsSection from "@/components/ToolsSection";
import ClientProviders from "@/ClientProviders";

export default function Home() {
  return (
    <>
      <ClientProviders /> {/* Bootstrap + AOS init */}
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
