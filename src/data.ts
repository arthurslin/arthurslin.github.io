export const links = {
  email: "arthurslin.work@gmail.com",
  linkedin: "https://www.linkedin.com/in/arthur-s-lin",
  github: "https://github.com/arthurslin",
  meowTest: "/meowballrush/",
  meowPlay:
    "https://play.google.com/store/apps/details?id=io.github.arthurslin.meowballrush",
  meowPrivacy: "https://arthurslin.github.io/meow-ball-rush-privacy/",
};

// Wording below follows the LinkedIn profile.

export interface Job {
  company: string;
  role: string;
  start: string;
  end?: string;
  location: string;
  highlights: string[];
}

export const jobs: Job[] = [
  {
    company: "Onto Innovation",
    role: "CPQ Analyst",
    start: "May 2024",
    location: "Milpitas, CA · On-site",
    highlights: [
      "Manage product configuration for 90+ models in Oracle CPQ, so sales quotes match customer specifications.",
      "Built an AI-powered Power Automate agent that automates executive sales-demand reporting.",
      "Consolidated data across multiple ERP systems with Python and Pandas, making sales and operations reports more reliable.",
      "Train the sales teams on the platform, and built the product team's JIRA setup from scratch.",
      "Liaison between business stakeholders and offshore developers, keeping communication clear and projects on schedule.",
    ],
  },
  {
    company: "Bridging Tech",
    role: "Software Engineer Intern",
    start: "Dec 2023",
    end: "May 2024",
    location: "Remote",
    highlights: [
      "Front-end development in React.js and TypeScript, working with the UI/UX team on interactive elements that improved user engagement.",
    ],
  },
];

export interface School {
  school: string;
  degree: string;
  when: string;
  note?: string;
}

export const schools: School[] = [
  {
    school: "Santa Clara University",
    degree: "MBA",
    when: "in progress",
    note: "Leavey School of Business.",
  },
  {
    school: "UC Santa Cruz",
    degree: "B.S. with Honors, Computer Science: Game Design",
    when: "Jan 2022 – Jun 2024",
    note: "3.48 GPA · Dean's Honors List, 2023 and 2024.",
  },
  {
    school: "Foothill College",
    degree: "A.S. with Honors, Computer Science",
    when: "Sep 2019 – Dec 2021",
  },
];
