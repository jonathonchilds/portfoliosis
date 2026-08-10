export const heroData = {
  title: "Full-Stack Software Engineer",
  heading: "Architecting the Modern Web",
  subheading: "I engineer scalable backend systems and immersive, high-performance frontends that push the boundaries of the browser."
};

export const capabilitiesData = [
  {
    title: "Frontend Architecture",
    description: "Building resilient, component-driven UIs with React, Vue, and modern state management tools.",
    icon: "🏗️" 
  },
  {
    title: "Backend Systems",
    description: "Designing scalable APIs and microservices using Node.js, Python, and serverless architectures.",
    icon: "🔌"
  },
  {
    title: "Database Design",
    description: "Structuring and optimizing both SQL and NoSQL databases for high-availability and speed.",
    icon: "💾"
  },
  {
    title: "Performance Optimization",
    description: "Auditing and resolving rendering bottlenecks, memory leaks, and large-bundle load times.",
    icon: "⚡"
  },
  {
    title: "Cloud Infrastructure",
    description: "Deploying globally distributed applications using AWS, GCP, Docker, and CI/CD pipelines.",
    icon: "☁️"
  },
  {
    title: "Creative Coding",
    description: "Crafting immersive 3D experiences and complex animations using Three.js and GSAP.",
    icon: "✨"
  }
];

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  caseStudy: {
    paragraphs: string[];
    metrics: string[];
    link?: string;
    github?: string;
  }
}

export const projectsData: ProjectData[] = [
  {
    id: "global-ecommerce",
    title: "Global E-Commerce Engine",
    description: "A highly available, microservices-driven retail platform processing thousands of transactions concurrently.",
    tags: ["React", ".NET Core", "SQL Server"],
    caseStudy: {
      paragraphs: [
        "This project involved architecting a complete overhaul of a legacy monolithic e-commerce platform into a highly scalable microservices architecture.",
        "We achieved a 99.99% uptime during peak holiday seasons and reduced average page load times by over 60%, leading to a direct increase in conversion rates."
      ],
      metrics: [
        "Processed 10,000+ concurrent transactions",
        "Reduced page load time by 60%",
        "99.99% Uptime during peak traffic"
      ],
      link: "#",
      github: "#"
    }
  },
  {
    id: "webgl-showcase",
    title: "Immersive WebGL Product Showcase",
    description: "An interactive, 3D landing page utilizing custom shaders to drive user engagement and conversion.",
    tags: ["Three.js", "React Three Fiber", "GSAP"],
    caseStudy: {
      paragraphs: [
        "To launch a flagship hardware product, we needed a landing page that felt as premium as the device itself.",
        "I built a custom 3D rendering pipeline in the browser using Three.js and React Three Fiber, featuring custom GLSL shaders for realistic lighting and material reflections. GSAP was used to seamlessly bind the 3D camera animations to the user's scroll."
      ],
      metrics: [
        "Increased time-on-page by 300%",
        "Maintained stable 60fps on mobile devices",
        "Nominated for Awwwards 'Site of the Day'"
      ],
      link: "#",
      github: "#"
    }
  },
  {
    id: "fintech-analytics",
    title: "Real-Time FinTech Analytics",
    description: "A low-latency dashboard streaming millions of market data points via WebSockets for institutional traders.",
    tags: ["WebSockets", "D3.js", "Redis"],
    caseStudy: {
      paragraphs: [
        "Institutional traders require sub-millisecond latency when visualizing market data. Traditional polling mechanisms were too slow and resource-intensive.",
        "I engineered a real-time data pipeline using Redis pub/sub and WebSockets to push live market ticks directly to a custom D3.js visualization engine built into a React dashboard. It handles massive data throughput without blocking the browser's main thread."
      ],
      metrics: [
        "Sub-millisecond data delivery latency",
        "Visualizing 1M+ data points continuously",
        "Zero dropped packets under heavy load"
      ],
      link: "#",
      github: "#"
    }
  }
];

export const philosophyData = [
  "Engineering is a team sport. I believe in natural leadership—scaling teams by actively mentoring, establishing robust documentation, and cultivating genuine friendships that extend far beyond the workplace.",
  "For me, software development isn't just a job; it's a major priority and a defining passion in my life. I take immense pride in translating complex business requirements into elegant technical solutions, and I bring that energy to every team I join."
];
