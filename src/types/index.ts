export interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

export interface NavbarProps {
  activeNav: string;
  navItems: string[];
  scrollTo: (id: string) => void;
}

export type LineType =
  | "cmd"
  | "output"
  | "json"
  | "git"
  | "success"
  | "warn"
  | "gap"
  | "error";

export interface Segment {
  text: string;
  color: string;
}

export interface Line {
  type: LineType;
  segments: Segment[];
  delay: number;
}

export interface GitHubUser {
  name: string;
  login: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  created_at: string;
}
