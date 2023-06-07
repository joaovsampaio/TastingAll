"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import { Balancer } from "react-wrap-balancer";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Form from "./Form/Form";

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

const textAnim = {
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

function Hero() {
  const [animStart, setAnimStart] = useState(false);

  const [teste, setTeste] = useState(false);
  return (
    <div className="bg-hero">
      {!animStart && (
        <Image
          alt="TastingAll"
          src="/../public/logo-name.png"
          width="500"
          height="500"
          className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]"
        />
      )}
      <motion.div
        variants={heroContent}
        initial="hidden"
        animate="visible"
        onAnimationStart={() => setAnimStart(true)}
        className="flex max-lg:flex-col justify-between items-center min-h-screen"
      >
        <motion.div
          variants={textAnim}
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
                src="/../public/logo-underline.png"
                width={200}
                height={200}
                aria-hidden
                className="inline ml-2"
              />
            </Balancer>
          </h2>
          <Separator
            className="lg:hidden"
            orientation="horizontal"
            aria-hidden
          />
        </motion.div>
        <Separator
          className="h-56 max-lg:hidden"
          orientation="vertical"
          aria-hidden
        />
        <div
          className={
            "flex flex-col items-center justify-center flex-1 text-center text-xl font-light"
          }
        >
          {teste ? (
            <div className="text-start p-2 rounded-md shadow-lg max-lg:mx-2 backdrop-saturate-150 backdrop-blur-lg">
              <Form />
            </div>
          ) : (
            <>
              <h3>
                <Balancer>
                  Aqui você compartilha suas receitas e descobre novos sabores.
                </Balancer>
              </h3>

              <p className="my-2">
                Venha fazer parte de uma comunidade amante da culinária:
              </p>
              <div className="flex items-center gap-5">
                <Button>Registrar</Button>
                <Button variant="outline">Entrar</Button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Hero;
