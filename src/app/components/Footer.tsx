import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";

function Footer() {
  return (
    <footer className="flex items-center justify-between bg-foreground/5 py-5 px-10 mt-auto max-md:flex-col max-md:gap-5">
      <Image
        alt="TastingAll"
        src="/../public/logo.png"
        width={50}
        height={50}
      />
      <span>Copyright © 2023 - All right reserved</span>
      <Link
        className="hover:bg-background rounded-full p-5"
        href="https://github.com/joaovsampaio"
        target="_blank"
      >
        <Github aria-label="github" />
      </Link>
    </footer>
  );
}

export default Footer;
