export interface Project {
    title: string;
    description: string;
    image: string;
    link?: string;
  }
  
  export const projectsData: Project[] = [
    {
      title: "Project 1",
      description: "Temporary description for Project 1.",
      image: "vite.svg",
    },
    {
      title: "Project 2",
      description: "Temporary description for Project 2.",
      image: "react.svg",
      link: "Test Link",
    },
  ];
  