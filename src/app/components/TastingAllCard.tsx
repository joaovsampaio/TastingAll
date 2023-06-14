import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {
  userName: Promise<string>;
  profileImage: string;
  recipeTitle: string;
  category: string;
  date: string;
  recipeImage: string;
};

function TastingAllCard({ ...props }: Props) {
  return (
    <Link href="/" className="w-[380px] max-md:w-11/12">
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Image
              alt=""
              src={props.profileImage}
              width={50}
              height={50}
              className="rounded-full"
            />
            <CardTitle className="overflow-hidden">{props.userName}</CardTitle>
          </div>
          <CardDescription className="text-base truncate pt-2">
            {props.recipeTitle}
          </CardDescription>
          <div className="flex justify-between items-center text-xs text-foreground/60 dark:text-foreground/20">
            <span>{props.category}</span>
            <time className="pr-1">{props.date}</time>
          </div>
        </CardHeader>
        <CardContent className="relative object-contain aspect-square border-t-2">
          <Image alt={props.recipeTitle} src={props.recipeImage} fill />
        </CardContent>
      </Card>
    </Link>
  );
}

export default TastingAllCard;
