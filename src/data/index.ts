export const NAV_ITEMS = [
  "home",
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
];

export const stats = [
  { val: "2+", label: "Years of Experience" },
  { val: "5+", label: "Projects Shipped" },
  { val: "2", label: "Companies Worked" },
  { val: "10+", label: "Technologies Used" },
];

export const skills: Record<string, string[]> = {
  "Backend / DB": [
    "MongoDB",
    "Express JS",
    "Node JS",
    "PostgreSQL",
    "MS SQL Server",
    "Nest JS",
    "C#",
    ".Net",
    "Prisma",
    "Entity Framework Core",
  ],
  Frontend: [
    "HTML5",
    "CSS",
    "Shadcn UI",
    "Tailwind CSS",
    "Tanstack Query",
    "Zustand",
    "Dart",
    "Flutter",
    "Next JS",
    "React",
    "JavaScript",
    "TypeScript",
    "Framer Motion",
  ],
  "Cloud / CI/CD": ["Git", "Docker", "Postman", "GitLab", "Vercel", "Render"],
};

export const projects = [
  {
    name: "FindThere",
    tag: "Lost and Found",
    description:
      "A full stack lost and found / lost item finder web application. Deployment in Progress",
    stack: ["Node JS", "Nest JS", "React", "Tailwind CSS", "TypeScript"],
    link: "https://www.youtube.com/watch?v=FPHVL2vmi9Y",
    num: "01",
  },
  {
    name: "FitMeter",
    tag: "Fitness Tracker",
    description:
      "Fitness tracker mobile app enabling users to create and track workout sessions, built with Flutter/Dart and a Node.js + MongoDB backend.",
    stack: ["Flutter", "Dart", "MongoDB", "Node.js", "Express.js"],
    link: "https://drive.google.com/file/d/1esytfnvfVO28MyuKWHqMtjps8WsxMQj_/view?usp=sharing",
    num: "02",
  },
  {
    name: "Cartify",
    tag: "E-Commerce",
    description:
      "Full-stack eCommerce app built with MERN, deployed on AWS. Migrated to Next.js for SSR with TypeScript, redeployed on Vercel and Render.",
    stack: ["Next.js", "TypeScript", "MongoDB", "AWS"],
    link: "https://cartify-io.vercel.app/",
    num: "03",
  },
  {
    name: "Gomegle",
    tag: "Chat App",
    description: "A real time chat app omegle inspired made with Go.",
    stack: ["Go", "WebSocket", "HTML", "JavaScript"],
    link: "https://gomegle.onrender.com/",
    num: "04",
  },
  {
    name: "WriteScape",
    tag: "Blogging Platform",
    description:
      "Interactive blogging platform where users write, share, and explore content. Built with React, MongoDB, Express.js, and Node.js, deployed on Vercel.",
    stack: ["React", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    link: "https://writescape.vercel.app/",
    num: "05",
  },
];
