export interface Workplace {
  title: string;
  jobTitle: string;
  description: string;
  dateStart: string;
  dateEnd?: string;
  image: string;
}

export const workplaces: Workplace[] = [
  {
    title: "Onto Innovation",
    jobTitle: "Technical Project Engineer Intern",
    description:
      "Built multiple software applications to automate data analysis across a few different departments. Those departments include: Field Service Engineers, R&D Systems Engineers, and Customer Service and Logistics.",
    dateStart: "May 2024",
    dateEnd: "",
    image: "onto_logo.svg",
  },
  {
    title: "Bridging Tech",
    jobTitle: "Software Engineer Intern",
    description:
      "Collaborated with cross-functional teams to design and implement software solutions to support educational initiatives, such as online learning platforms and resource databases. Participated in the full software development lifecycle, from requirements gathering and design to implementation, and deployment.",
    dateStart: "Dec 2023",
    dateEnd: "May 2024",
    image: "bridge_logo.png",
  },
];
