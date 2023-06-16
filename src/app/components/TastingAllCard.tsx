"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Trash2 } from "lucide-react";
import { useProfile } from "@/lib/store";
import { CustomAlertDialog } from "./ui/alert-dialog";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type Props = {
  userName: Promise<string>;
  profileImage: string;
  recipeTitle: string;
  category: string;
  date: string;
  recipeImage: string;
  recipeId: string;
  userId: string;
};

function TastingAllCard({ ...props }: Props) {
  const { profile } = useProfile();
  const route = useRouter();

  const goToUserProfile = (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>,
    userId: string
  ) => {
    e.preventDefault();
    route.push(`/profile/${userId}`);
  };

  const deleteRecipe = async (recipeId: string) => {
    const { error } = await supabase
      .from("recipes")
      .delete()
      .eq("id", recipeId);

    await supabase.storage
      .from("tastingall-bucket")
      .remove([`recipes/${recipeId}`]);

    if (!error) return route.refresh();
  };

  return (
    <Link
      className="w-[380px] max-md:w-11/12 hover:opacity-90"
      href={`/recipe/${props.recipeId}`}
    >
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Image
              alt=""
              src={props.profileImage}
              width={50}
              height={50}
              className="rounded-full w-12 h-12"
            />
            <CardTitle
              className="overflow-hidden hover:underline hover:text-primary hover:cursor-pointer"
              onClick={(e) => goToUserProfile(e, props.userId)}
            >
              {props.userName}
            </CardTitle>
          </div>
          <CardDescription className="text-base truncate pt-2">
            {props.recipeTitle}
          </CardDescription>
          <div className="flex justify-between items-center text-xs text-foreground/60 dark:text-foreground/20">
            <span>{props.category}</span>
            <time className="pr-1">{props.date}</time>
            <div
              hidden={profile?.id !== props.userId ? true : false}
              onClick={(e) => e.preventDefault()}
            >
              <CustomAlertDialog
                triggerText={
                  <Trash2 className="text-destructive hover:bg-destructive/10 rounded-full" />
                }
                title="Deletar Receita?"
                description="Essa ação não pode ser desfeita!"
                onActionClick={() => deleteRecipe(props.recipeId)}
              />
            </div>
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
