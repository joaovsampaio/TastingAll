import Hero from "@/components/Hero";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="flex flex-col justify-center items-center my-5">
        <Card className="w-[380px] max-md:w-11/12 overflow-hidden">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Image
                alt="Teste"
                src="/../public/logo.png"
                width={50}
                height={50}
              />
              <CardTitle className="overflow-hidden">Teste</CardTitle>
            </div>
            <CardDescription className="truncate pt-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat
              minima
            </CardDescription>
          </CardHeader>
          <CardContent className="relative object-contain aspect-square border-t-2">
            <Image alt="Teste" src="https://picsum.photos/800" fill />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
