export interface Project {
  title: string;
  description: string;
  image: string;
  link?: string;
}

export const projectsData: Project[] = [
  {
    title: "Golf Bash Online",
    description:
      "Golf Bash: Online is the ultimate golf showdown where friendship takes a swing! In this silly party game, grab your clubs and prepare to battle it out throughout a round of golf.",
    image: "gboheader.jpg",
    link: "https://aguizaro.github.io/GolfSite/",
  },
  {
    title: "Project 2",
    description: "Temporary description for Project 2.",
    image: "react.svg",
    link: "Test Link",
  },
];
