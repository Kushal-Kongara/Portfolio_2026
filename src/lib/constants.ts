export const hero = {
  name: "Kushal Full Stack Developer",
  tagline: "Tagline here.",
  subtitle: "Support line or subtitle.",
  ctaPrimary: "Resume",
  ctaPrimaryHref: "#contact",
  ctaSecondary: "AI Voice agent",
  ctaSecondaryHref: "#projects",
};

export const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  skills: string[];
  logo?: string; // path in public, e.g. "/experience/oatmeal.svg"
};

export const experiences: ExperienceItem[] = [
  {
    company: "Oatmeal AI",
    role: "Full-stack Developer",
    period: "Aug 2025 - Jan 2026 · 6 mos",
    location: "Medford, Oregon, United States · Remote",
    bullets: [
      "Led the migration of legacy ASP-based systems to a modern stack using React.js, TypeScript, Tailwind CSS, Node.js, and Next.js, improving maintainability and reducing page-load times by 45%.",
      "Architected and deployed RESTful APIs integrated with Azure SQL Database, enabling secure, real-time data exchange for AI analytics and model inference pipelines.",
      "Orchestrated and implemented CI/CD pipelines with GitHub Actions, Docker, and Vercel, achieving zero-downtime deployments and faster release cycles.",
      "Created an AI-powered chatbot agent leveraging Large Language Models (LLMs) and Hugging Face transformers, enhancing user interaction and automating customer support workflows.",
      "Developed a cross-platform mobile app using Flutter, extending the web experience to Android and iOS while maintaining a unified backend.",
      "Built a component driven UI system using Tailwind CSS and Storybook, improving design consistency and cutting front-end development effort by 30%.",
      "Collaborated with AI engineers and stakeholders to deliver scalable, production-ready solutions with a focus on security, performance, and user experience.",
    ],
    skills: ["JavaScript", "TypeScript", "React.js", "Next.js", "Node.js", "Tailwind CSS", "Flutter", "Docker", "Azure", "GitHub Actions"],
  },
  {
    company: "Cyber Infrastructure (CIS)",
    role: "Software Engineer",
    period: "Feb 2025 - Aug 2025 · 7 mos",
    location: "San Jose, California, United States · Remote",
    bullets: [
      "Designed, developed, and deployed production-grade microservices using Node.js, Express.js, and MongoDB, improving platform scalability by 30% and enabling the company's fastest feature rollout.",
      "Architected high-performance APIs for real-time workflow coordination, integrating AWS services such as EC2, API Gateway, Lambda, S3, and DynamoDB to enhance reliability and fault tolerance.",
      "Automated subscription and payment workflows using Stripe webhooks and AWS Lambda, reducing manual effort by 40% and improving payment success rates by 5%.",
      "Integrated secure inter-service communication with JWT authentication and AWS KMS encryption, ensuring compliance with industry-grade security standards.",
      "Oversaw the full SDLC, from architecture and development to automated testing and deployment via GitLab CI/CD, achieving consistent zero-downtime releases.",
    ],
    skills: ["React.js", "React Native", "Node.js", "Express.js", "MongoDB", "AWS", "Stripe", "GitLab CI/CD", "JWT", "Microservices"],
  },
  {
    company: "San Francisco Bay University",
    role: "Master of Science in Computer Science",
    period: "Jan 2023 - Dec 2024",
    location: "Fremont, California, United States",
    bullets: [
      "Pursued advanced coursework in software engineering, distributed systems, and artificial intelligence.",
      "Collaborated on multiple academic projects focusing on scalable web applications and machine learning models.",
    ],
    skills: ["Software Engineering", "Algorithms", "Distributed Systems", "Artificial Intelligence"],
  },
  {
    company: "Moved to US",
    role: "Relocation & Higher Education",
    period: "Jan 2023",
    location: "United States",
    bullets: [
      "Relocated to the United States to pursue a Master's degree and explore advanced opportunities in the tech industry.",
    ],
    skills: [],
  },
  {
    company: "DispatchTrack",
    role: "Software Engineer",
    period: "Dec 2021 - Dec 2022 · 1 yr 1 mo",
    location: "Hyderabad, Telangana, India · Hybrid",
    bullets: [
      "Developed and maintained enterprise logistics applications using JavaScript, React.js, Next.js, Node.js, and Express.js improving delivery scheduling efficiency and user experience.",
      "Optimized RESTful and GraphQL APIs to handle real-time logistics data, reducing latency and improving API response reliability by 25%.",
      "Integrated AWS services including EC2, Lambda, API Gateway, and S3 for scalable deployments and secure data handling.",
      "Modeled and implemented data models with PostgreSQL, ensuring high data integrity and query performance across multi-region environments.",
      "Partnered with product and QA teams in an Agile setup to ensure seamless feature delivery, maintaining 99% uptime and efficient release cycles.",
    ],
    skills: ["HTML", "CSS", "JavaScript", "React.js", "Next.js", "Node.js", "Express.js", "PostgreSQL", "GraphQL", "AWS"],
  },
  {
    company: "L&T Finance",
    role: "Software Engineer",
    period: "Nov 2019 - Nov 2021 · 2 yrs 1 mo",
    location: "Mumbai, Maharashtra, India · Remote",
    bullets: [
      "Engineered and maintained finance-grade web applications using HTML, CSS, JavaScript, React.js, Node.js, and PostgreSQL, improving data accuracy and platform reliability.",
      "Developed secure RESTful APIs for loan and transaction data with robust input validation and authentication, processing 5K+ daily requests with consistent uptime and reliability.",
      "Optimized PostgreSQL queries and backend logic, reducing average response time and improving overall application performance.",
      "Constructed responsive React dashboards used daily by 20+ financial analysts, streamlining loan processing and credit evaluation workflows.",
      "Collaborated with cross-functional teams to implement new financial workflows, ensuring data integrity, security compliance, and timely product delivery.",
    ],
    skills: ["Software Design", "Web Engineering", "HTML", "CSS", "JavaScript", "React.js", "Node.js", "PostgreSQL"],
  },
];

export const projects = [
  {
    title: "Game Intro",
    description: "Short description of the project and what you built.",
    link: "https://your-live-site-url.com",
    code: "https://github.com/your-username/your-repo",
    // image: "/your-project-image.jpg", 
  },
  {
    title: "Project Two",
    description: "Another project summary highlighting key features.",
    link: "#",
    code: "#",
  },
  {
    title: "Project Three",
    description: "A comprehensive description of a full stack application built.",
    link: "#",
    code: "#",
  },
  {
    title: "Project Four",
    description: "An innovative real-time solution displaying your skills.",
    link: "#",
    code: "#",
  },
  {
    title: "Project Five",
    description: "Building scalable cloud-native architectures.",
    link: "#",
    code: "#",
  },
  {
    title: "Project Six",
    description: "Creating engaging and interactive user experiences.",
    link: "#",
    code: "#",
  },
  {
    title: "Project Seven",
    description: "Integrating intelligent AI models into web workflows.",
    link: "#",
    code: "#",
  },
  {
    title: "Project Eight",
    description: "Designing simple solutions for complex data pipelines.",
    link: "#",
    code: "#",
  },
];

// About section: intro + events/hackathons + photo stories
export const about = {
  intro: [
    "Your opening paragraph about who you are, what you do, and what drives you. You can use multiple paragraphs—each string here becomes a block.",
    "A second paragraph to share your background, interests, or what you're currently focused on. Use orange for key phrases if you like.",
  ],
};

export type EventItem = {
  name: string;
  date: string;
  roleOrPrize?: string; // e.g. "Participant", "2nd Place", "Mentor"
  description?: string;
  link?: string;
};

export const events: EventItem[] = [
  {
    name: "Hackathon Name 2024",
    date: "Month 2024",
    roleOrPrize: "2nd Place",
    description: "Short line about the project or experience.",
    link: "#",
  },
  {
    name: "Another Event",
    date: "Month 2024",
    roleOrPrize: "Participant",
    description: "What you built or learned.",
  },
];

export type PhotoStory = {
  image: string; // path in public, e.g. "/about/photo1.jpg"
  imageAlt: string;
  title: string;
  context: string; // paragraph(s) of context beside the photo
};

export const photoStories: PhotoStory[] = [
  {
    image: "/about/photo1.jpg",
    imageAlt: "Description of the photo for accessibility",
    title: "GitHub Hackathon winners",
    context: "We got 1st place for our AI voice agent project",
  },
  {
    image: "/about/photo2.jpg",
    imageAlt: "Second photo description",
    title: "AWS Hackathon winners",
    context: "We got 1st place for our AI voice agent project",
  },
  {
    image: "/about/photo3.jpg",
    imageAlt: "Workspace setup",
    title: "Weighted baises Hackathon",
    context: "",
  },
  {
    image: "/about/photo4.jpg",
    imageAlt: "Team offsite",
    title: "Met Harnoor Singh",
    context: "Been following his content  ",
  },
  {
    image: "/about/photo5.jpg",
    imageAlt: "Notebook sketches",
    title: "Amazon Hackathon",
    context: "",
  },
  {
    image: "/about/photo6.jpg",
    imageAlt: "Coffee mug",
    title: "HackDay event",
    context: "Built AI powered sales agent for small businesses",
  },
  {
    image: "/about/photo7.jpg",
    imageAlt: "Group picture",
    title: "Product demo at VAPI",
    context: "Git invited to VAPI for our product demo",
  },
  {
    image: "/about/photo8.jpg",
    imageAlt: "Sunset city view",
    title: "Evening Views",
    context: "The view from my desk as I finally hit 'deploy' on our biggest release of the year. Nothing beats the feeling of seeing your work go live.",
  },
];
