"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookPlus, Settings2, UserSquare } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CustomSheet } from "./ui/sheet";
import { Button } from "./ui/button";
import FormRecipe from "./Forms/recipe/FormRecipe";
import UpdateUser from "./Forms/auth/UpdateUser";
import { supabase } from "@/lib/supabaseClient";
import { useProfile } from "@/lib/store";
import { cn } from "@/lib/utils";

type UserCardProps = {
  profileImage: string | undefined;
  userName: string;
  description: string;
  userId: string;
  descriptionStyle?: string;
};

export function UserCard({ ...props }: UserCardProps) {
  const { profile } = useProfile();

  return (
    <Card className="w-[400px] max-sm:w-11/12">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Image
            alt={props.userName}
            src={
              props.profileImage === undefined
                ? "/../public/blank-profile-picture.png"
                : props.profileImage
            }
            width={50}
            height={50}
            className="rounded-full w-12 h-12"
            key={props.profileImage}
          />
          <CardTitle className="overflow-hidden">{props.userName}</CardTitle>
        </div>
        <CardDescription
          className={cn("text-left line-clamp-4 pt-5", props.descriptionStyle)}
        >
          {props.description}
        </CardDescription>
      </CardHeader>
      {profile?.id === props.userId && (
        <CardContent className="flex items-center justify-between p-6">
          <Link
            className="hover:bg-primary/20 rounded-full p-2"
            title="Perfil"
            href={`/profile/${props.userId}`}
          >
            <UserSquare className="text-primary" aria-label="Perfil" />
          </Link>
          <CustomSheet
            title="Nova Receita"
            content={<FormRecipe />}
            Icon={BookPlus}
            description="Compartilhe uma nova receita"
          />
          <CustomSheet
            title="Configurações"
            content={<UpdateUser />}
            Icon={Settings2}
            description="Edite as informações do seu perfil"
          />
        </CardContent>
      )}
    </Card>
  );
}

export function HeroUserCard() {
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const { profile, setProfile } = useProfile();

  useEffect(() => {
    const user = async () => {
      const supabaseUser = await supabase.auth.getUser();

      if (!supabaseUser.error) {
        const userImage = supabase.storage
          .from("tastingall-bucket/profiles")
          .getPublicUrl(supabaseUser.data.user!.id);

        setProfileImage(userImage.data.publicUrl);
        setProfile(supabaseUser.data.user);
      }
    };

    user();
  }, [profileImage]);

  return (
    <>
      {profile ? (
        <UserCard
          userName={profile?.user_metadata.userName}
          profileImage={profileImage}
          description={profile?.user_metadata.description}
          userId={profile?.id}
        />
      ) : (
        <>
          <p>Venha fazer parte de uma comunidade amante da culinária:</p>
          <div className="flex items-center justify-center gap-5">
            <Link href="/auth/register">
              <Button>Registrar</Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline">Entrar</Button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}
