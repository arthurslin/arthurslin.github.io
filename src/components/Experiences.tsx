export interface Workplace {
  title: string;
  jobTitle: string;
  description: string;
  dateStart: string;
  dateEnd?: string;
  image: string;
  size: number;
}

export const workplaces: Workplace[] = [
  {
    title: "Onto Innovation",
    jobTitle: "ERP Analyst",
    description:
      "Built multiple software applications to automate data analysis across a few different departments. Those departments include: Field Service Engineers, R&D Systems Engineers, and Customer Service and Logistics.",
    dateStart: "May 2024",
    dateEnd: "",
    image: "onto_logo.svg",
    size: 75,
  },
  {
    title: "Bridging Tech",
    jobTitle: "Software Engineer Intern",
    description:
      "Collaborated with cross-functional teams to design and implement software solutions to support educational initiatives, such as online learning platforms and resource databases. Participated in the full software development lifecycle, from requirements gathering and design to implementation, and deployment.",
    dateStart: "Dec 2023",
    dateEnd: "May 2024",
    image: "bridge_logo.png",
    size: 50,
  },
  {
    title: "Petco",
    jobTitle: "Sales Associate",
    description:
      "Provided excellent customer service by greeting customers, answering inquiries about products, and assisting with purchases.  Maintained up-to-date knowledge on pet products to offer informed recommendations to customers.",
    dateStart: "June 2022",
    dateEnd: "August 2022",
    image: "petco_logo.svg",
    size: 50,
  },
  {
    title: "Target",
    jobTitle: "Security Specialist",
    description:
      "Employed advanced crisis management skills to effectively de-escalate high-stress situations, thereby preventing inventory shortages by successfully recovering stolen merchandise. Additionally, leveraged intelligence-driven tactics to safeguard both team members and guests, fostering a secure environment.",
    dateStart: "August 2021",
    dateEnd: "December 2021",
    image: "target_logo.svg",
    size: 25,
  },
];
