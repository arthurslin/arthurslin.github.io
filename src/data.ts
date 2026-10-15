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
  {
    company: "Petco",
    role: "Sales Associate",
    start: "Jun 2022",
    end: "Aug 2022",
    logo: "petco_logo.svg",
    summary:
      "Helped customers find the right products for their pets and kept up with the product catalog to give informed recommendations.",
  },
  {
    company: "Target",
    role: "Security Specialist",
    start: "Aug 2021",
    end: "Dec 2021",
    logo: "target_logo.svg",
    summary:
      "De-escalated high-stress situations, recovered stolen merchandise, and kept team members and guests safe.",
  },
];
