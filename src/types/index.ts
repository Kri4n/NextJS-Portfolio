export interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

export interface NavbarProps {
  activeNav: string;
  navItems: string[];
  scrollTo: (id: string) => void;
}
