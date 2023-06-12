import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

function TastingAllCard() {
  return (
    <Link href="/" className="w-[380px] max-md:w-11/12 overflow-hidden">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Image
              alt="Teste"
              src="https://picsum.photos/800"
              width={50}
              height={50}
              className="rounded-full"
            />
            <CardTitle className="overflow-hidden">Teste</CardTitle>
          </div>
          <CardDescription className="text-base truncate pt-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat
            minima
          </CardDescription>
          <div className="flex justify-between items-center text-xs text-foreground/60 dark:text-foreground/20">
            <span>Massa</span>
            <div>
              <time className="pr-1">00/00/00</time>
              <time>00:00</time>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative object-contain aspect-square border-t-2">
          <Image alt="Teste" src="https://picsum.photos/800" fill />
        </CardContent>
      </Card>
    </Link>
  );
}

export default TastingAllCard;
