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

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ErrorState {
  message: string;
  code?: string;
}

export interface ChatErrorProps {
  message: string;
  code?: string;
  onRetry?: () => void;
}

export interface ModelConfig {
  id: string;
  name: string;
  maxRPM: number;
  maxRPD: number;
  maxTPM: number;
  priority: number; // lower = preferred
}

export interface ModelUsage {
  rpm: number;
  rpmWindowStart: number;
  rpd: number;
  rpdWindowStart: number;
}

export type FallbackResult =
  | { success: true; text: string; modelUsed: string }
  | { success: false; code: string; error: string };
