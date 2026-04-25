export const NAV_ITEMS = [
  "home",
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
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
    "Redis"
  ],
  "Frontend": [
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

export const experience = [
  {
    company: "AIQUE Innovation Technology Corporation",
    role: "Full-Stack Developer",
    type: "Full-Time",
    period: "April 2026 – Present",
    location: "Bonifacio Global City, Philippines",
    current: true,
    highlights: [
      "lorem ipsum dolor sit amet consectetur adipisicing elit.",
    ],
  },
  {
    company: "Archangel Technologies, Inc.",
    role: "Software Developer",
    type: "Full-Time",
    period: "May 2025 – March 2026",
    location: "Mandaluyong City, Philippines",
    current: false,
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
    period: "February 2025 – March 2025",
    location: "Brisbane, Australia (Remote)",
    current: false,
    highlights: [
      "Re-engineered the U&I Global Expo website, improving UX and consultation booking flow",
      "Implemented modern responsive design using React and Tailwind CSS",
      "Optimized performance with SPA architecture for faster navigation",
    ],
  },
];