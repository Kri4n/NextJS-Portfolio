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
    tag: "Lost & Found",
    description:
      "A full stack lost and found / lost item finder web application. Deployment in Progress.",
    stack: ["Node JS", "Nest JS", "React", "Tailwind CSS", "TypeScript"],
    link: "https://www.youtube.com/watch?v=FPHVL2vmi9Y",
    image: "/images/projects/findthere.png",
  },
  {
    name: "FitMeter",
    tag: "Fitness Mobile App",
    description:
      "Fitness tracker mobile app enabling users to create and track workout sessions.",
    stack: ["Flutter", "Dart", "MongoDB", "Node.js", "Express.js"],
    link: "https://drive.google.com/file/d/1esytfnvfVO28MyuKWHqMtjps8WsxMQj_/view?usp=sharing",
    image: "/images/projects/FitMeter.png",
  },
  {
    name: "Cartify",
    tag: "E-Commerce",
    description: "Full-stack eCommerce capstone project from our bootcamp.",
    stack: ["Next.js", "TypeScript", "MongoDB", "AWS"],
    link: "https://cartify-io.vercel.app/",
    image: "/images/projects/cartify.png",
  },
  {
    name: "Gomegle",
    tag: "Chat App",
    description: "A real time chat app omegle inspired made with Go.",
    stack: ["Go", "WebSocket", "HTML", "JavaScript"],
    link: "https://gomegle.onrender.com/",
    image: "/images/projects/Gomegle.jpg",
  },
  {
    name: "WriteScape",
    tag: "Blog",
    description: "Interactive blogging platform",
    stack: ["React", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    link: "https://writescape.vercel.app/",
    image: "/images/projects/writescape.png",
  },
];
