import { GITHUB_LINK, UPWORK_LINK } from "src/consts";

export const navData = [
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
  {
    name: "Upwork",
    path: UPWORK_LINK,
    ariaLabel: "Go to my upwork",
  },
  {
    name: "Github",
    path: GITHUB_LINK,
    ariaLabel: "Go to my upwork",
    icon: {
      name: "mdi:github",
      width: "30",
    },
  },
];
