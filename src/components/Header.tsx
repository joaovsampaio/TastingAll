"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  useAnimation,
} from "framer-motion";
import { Sun, Moon } from "lucide-react";

import { storageTheme } from "@/lib/storageTheme";
import { cn } from "@/lib/utils";
import { Switch } from "./ui/switch";

function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [headerBlur, setHeaderBlur] = useState(false);

  const sunAnim = useAnimation();
  const moonAnim = useAnimation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    latest >= 200 ? setHeaderBlur(true) : setHeaderBlur(false);
  });

  useEffect(() => {
    storageTheme(setDarkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    if (darkMode) {
      localStorage.theme = "light";
      sunAnim.start({ y: -8 });
    } else {
      localStorage.theme = "dark";
      moonAnim.start({ y: -8 });
    }

    setDarkMode((prevTheme) => !prevTheme);
  };

  return (
    <header
      className={cn(
        "fixed flex w-full justify-between items-center z-10 px-5 py-2 duration-500 ease-in-out",
        headerBlur && "backdrop-saturate-150 backdrop-blur-md"
      )}
    >
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/../public/logo.png"
          alt="TastingAll"
          width="50"
          height="50"
          className="lg:hidden"
        />
        <Image
          src="/../public/logo-name.png"
          alt="TastingAll"
          width="200"
          height="200"
          priority
          className="max-lg:hidden"
        />
      </Link>
      <div className="flex justify-between items-center gap-2">
        <motion.div
          initial={{ y: 0 }}
          animate={sunAnim}
          transition={{
            ease: "easeInOut",
            repeatType: "reverse",
            repeat: 5,
            duration: 0.5,
          }}
        >
          <Sun />
        </motion.div>
        <Switch
          className="toggle bg-primary border-primary"
          onCheckedChange={() => toggleTheme()}
          checked={darkMode ? true : false}
          aria-label="trocar tema"
          type="button"
        />
        <motion.div
          initial={{ y: 0 }}
          animate={moonAnim}
          transition={{
            ease: "easeInOut",
            repeatType: "reverse",
            repeat: 5,
            duration: 0.5,
          }}
        >
          <Moon />
        </motion.div>
      </div>
    </header>
  );
}

export default Header;
