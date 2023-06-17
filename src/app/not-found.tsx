import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-lg font-bold text-destructive uppercase">
        página não encontrada
      </h1>
      <Image
        alt=""
        src="/../public/404.jpg"
        width={500}
        height={500}
        priority
      />
      <Link href="https://storyset.com/web" target="_blank">
        Web illustrations by Storyset
      </Link>
    </div>
  );
}

export default NotFound;
