import { Dispatch, SetStateAction } from "react";

export const storageTheme = (
  setDarkMode: Dispatch<SetStateAction<boolean>>
) => {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    setDarkMode(true);
  } else {
    document.documentElement.classList.remove("dark");
    setDarkMode(false);
  }
};
