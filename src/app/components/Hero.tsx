"use client";

import { useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { Balancer } from "react-wrap-balancer";

import { Separator } from "./ui/separator";
import { HeroUserCard } from "./UserCard";

const inter = Inter({ subsets: ["latin"], weight: "900" });

const heroContent = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ease: "easeIn",
      type: "just",
    },
  },
};

const textSlogan = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeIn",
      type: "just",
      delay: 0.5,
    },
  },
};

const textSignIn = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeIn",
      type: "just",
      delay: 0.5,
    },
  },
};

function Hero() {
  const [animStart, setAnimStart] = useState(false);

  return (
    <div className="bg-hero">
      <AnimatePresence>
        {!animStart && (
          <motion.div
            exit={{ opacity: 0 }}
            className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]"
          >
            <Image
              alt="TastingAll"
              src="/logo-name.png"
              width="500"
              height="500"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        variants={heroContent}
        initial="hidden"
        animate="visible"
        onAnimationStart={() => setAnimStart(true)}
        className="flex max-lg:flex-col justify-between items-center min-h-screen"
      >
        <motion.div
          variants={textSlogan}
          initial="hidden"
          animate="visible"
          className="flex flex-1 flex-col justify-center max-lg:min-h-screen"
        >
          <h2
            style={inter.style}
            className="mb-5 text-center text-5xl max-md:text-4xl"
          >
            <Balancer>
              Descubra, compartilhe e saboreie um mundo de sabores no
              <Image
                alt="underline"
                src="/logo-underline.png"
                width={200}
                height={200}
                aria-hidden
                className="inline ml-2"
              />
            </Balancer>
          </h2>
        </motion.div>
        <Separator
          className="h-56 max-lg:hidden"
          orientation="vertical"
          aria-hidden
        />

        <motion.div
          className={
            "flex flex-1 w-full flex-col items-center justify-center gap-5 text-center text-xl font-light"
          }
          variants={textSignIn}
          initial="hidden"
          animate="visible"
        >
          <HeroUserCard />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Hero;
