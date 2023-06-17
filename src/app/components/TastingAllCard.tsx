"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Trash2, UserCircle2 } from "lucide-react";
import { useProfile } from "@/lib/store";
import { CustomAlertDialog } from "./ui/alert-dialog";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/lib/use-toast";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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
  const { toast } = useToast();
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

    if (!error) {
      toast({ title: "Receita Apagada", variant: "destructive" });
      route.refresh();
    }
  };

  return (
    <Card className="overflow-hidden w-[400px] max-md:w-11/12 ">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage alt="" src={props.profileImage} />
            <AvatarFallback>
              <UserCircle2 />
            </AvatarFallback>
          </Avatar>
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
          {profile?.id === props.userId && (
            <div onClick={(e) => e.preventDefault()}>
              <CustomAlertDialog
                triggerText={
                  <Trash2 className="text-destructive hover:bg-destructive/10 rounded-full" />
                }
                title="Deletar Receita?"
                description="Essa ação não pode ser desfeita!"
                onActionClick={() => deleteRecipe(props.recipeId)}
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="relative aspect-square border-t-2">
        <Image alt={props.recipeTitle} src={props.recipeImage} fill />
      </CardContent>
    </Card>
  );
}

export default TastingAllCard;
