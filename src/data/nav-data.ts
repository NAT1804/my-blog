import { GITHUB_LINK, UPWORK_LINK } from "src/consts";

interface INav {
  name: string;
  path: string;
  ariaLabel: string;
  icon?: {
    name: string;
    width: string;
  };
}

export const navData: INav[] = [
  {
    name: "About",
    path: "/about/",
    ariaLabel: "About me",
  },
  {
    name: "Blog",
    path: "/blog/",
    ariaLabel: "Go to blog",
  },
];
