export const links = {
  email: "arthurslin.work@gmail.com",
  linkedin: "https://www.linkedin.com/in/arthur-s-lin",
  github: "https://github.com/arthurslin",
  meowTest: "/meowballrush/",
  meowPlay:
    "https://play.google.com/store/apps/details?id=io.github.arthurslin.meowballrush",
  meowPrivacy: "https://arthurslin.github.io/meow-ball-rush-privacy/",
};

export interface Job {
  company: string;
  role: string;
  start: string;
  end?: string;
  logo: string;
  summary: string;
}

export const jobs: Job[] = [
  {
    company: "Onto Innovation",
    role: "CPQ Analyst",
    start: "May 2024",
    logo: "onto_logo.svg",
    summary:
      "Build software that automates data analysis for Field Service Engineering, R&D Systems Engineering, and Customer Service & Logistics.",
  },
  {
    company: "Bridging Tech",
    role: "Software Engineer Intern",
    start: "Dec 2023",
    end: "May 2024",
    logo: "bridge_logo.png",
    summary:
      "Designed and shipped software for educational initiatives, including online learning platforms and resource databases, across the full development lifecycle.",
  },
];
