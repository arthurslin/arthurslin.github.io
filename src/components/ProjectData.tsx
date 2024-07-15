export interface Project {
    title: string;
    description: string;
    image: string;
    size?: number;
  }
  
  export const projectsData: Project[] = [
    {
      title: "Project 1",
      description: "Description for Project 1.",
      image: "vite.svg",

    },
    {
      title: "Project 2",
      description: "Description for Project 2.",
      image: "react.svg",

    },

  ];
  