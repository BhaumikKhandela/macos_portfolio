import type { WindowConfigKeyType } from "../components/store/window";

type NavLinkType = {
  id: number;
  name: string;
  type: WindowConfigKeyType;
}
const navLinks: NavLinkType[] = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

type DockApp = {
  id: WindowConfigKeyType,
  name: string;
  icon: string;
  canOpen: boolean;
}
const dockApps: DockApp[] = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Projects", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "GitHub", // was "Photos"
    icon: "github.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "txtfile",
    name: "Archive", // was "Trash"
    icon: "trash.png",
    canOpen: false,
  },
];

const blogPosts = [
  {
    id: 1,
    date: "Sep 2, 2025",
    title:
      "ATHENA — Workflow Automation Platform",
    image: "/images/athena-logo.svg",
    link: "https://athena-vn52.vercel.app",
  },
  {
    id: 2,
    date: "Aug 28, 2025",
    title: "ROME — AI Powered Browser IDE",
    image: "/images/rome-logo.svg",
    link: "https://rome-black.vercel.app",
  },
];

const techStack = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Hono"],
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL", "Convex"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "Docker"],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/BhaumikKhandela",
  },
  {
    id: 3,
    text: "Twitter/X",
    icon: "/icons/twitter.svg",
    bg: "#ff866b",
    link: "https://x.com/Bh15544Bhaumik",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/bhaumik-khandela-366543281/",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/gal1.png",
  },
  {
    id: 2,
    img: "/images/gal2.png",
  },
  {
    id: 3,
    img: "/images/gal3.png",
  },
  {
    id: 4,
    img: "/images/gal4.png",
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
};


const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: "ROME — AI Powered Browser IDE",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5", // icon position inside Finder
      windowPosition: "top-[5vh] left-5", // optional: Finder window position
      children: [
        {
          id: 1,
          name: "Browser IDE.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
          "ROME is an AI-powered browser IDE that allows developers to create, edit, and run projects directly in the browser.",
          "Instead of a traditional editor, it provides an AI-native workspace where developers can collaborate with an autonomous coding agent.",
          "Think of it like having a smart coding assistant that can understand your project, modify files, and help build features alongside you.",
          "It includes a full in-browser development environment with CodeMirror editing, WebContainer runtime execution, and GitHub integration.",
          "Built with Next.js, Convex, and Inngest Agent Kit, it enables real-time development, AI orchestration, and seamless project workflows.",
],
        },
        {
          id: 2,
          name: "rome.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://rome-black.vercel.app/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "rome.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-1.png",
        },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: "ATHENA — Workflow Automation Platform",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 1,
          name: "ATHENA — Workflow Automation Platform.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
          "ATHENA is a workflow automation platform that allows users to connect APIs and build automated processes through a visual node-based interface.",
          "Instead of manually handling repetitive tasks, users can design workflows that integrate services like Stripe, Slack, Google Docs, Discord, and AI models.",
          "Think of it like building your own automation pipelines—similar to tools like Zapier or n8n—but with greater flexibility and developer-focused customization.",
          "It provides real-time workflow execution, background job processing, and reliable task orchestration for complex automation scenarios.",
          "Built with Next.js, tRPC, Prisma, PostgreSQL, and Inngest, it enables scalable event-driven automation and seamless API integrations.",
        ],
        },
        {
          id: 2,
          name: "athena.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://athena-vn52.vercel.app/",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "athena.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-2.png",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/Bhaumik.jpg",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-50 left-5",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/profile.png",
      description: [
  "Hey! I’m Bhaumik 👋, a full-stack developer who enjoys building developer tools, AI-powered applications, and scalable web platforms.",
  "I primarily work with TypeScript, React, and Next.js, and I love designing systems that combine clean UI with powerful backend logic.",
  "Recently, I’ve been focused on building AI-native products like browser IDEs, automation platforms, and intelligent developer workflows.",
  "I enjoy experimenting with new technologies, turning complex ideas into working products, and constantly learning how real-world systems are built.",
  "Outside of coding, you'll probably find me exploring new tech stacks, refining project ideas, or deep in a debugging rabbit hole at odd hours.",
],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/resume.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
} as const ;

export type WorkLocationType = typeof locations.work.children

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
} as const;

export { INITIAL_Z_INDEX, WINDOW_CONFIG };