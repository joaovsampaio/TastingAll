"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import FormRecipe from "./Forms/recipe/FormRecipe";
import { BookDown, BookPlus, Settings2, UserSquare } from "lucide-react";
import UpdateUser from "./Forms/auth/UpdateUser";
import { User } from "@supabase/supabase-js";

type SheetActionsProps = {
  title: string;
  description?: string;
  content: React.ReactNode;
  Icon: React.ElementType;
};

function SheetActions({
  title,
  description,
  content,
  Icon,
}: SheetActionsProps) {
  return (
    <Sheet>
      <SheetTrigger
        title={title}
        className="hover:bg-primary/20 rounded-full p-2"
      >
        <Icon className="text-primary" aria-label={title} />
      </SheetTrigger>
      <SheetContent className="overflow-y-auto max-md:w-full">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription className="pb-5">{description}</SheetDescription>
        </SheetHeader>
        {content}
      </SheetContent>
    </Sheet>
  );
}

function UserCard() {
  const [userData, setUserData] = useState<User>();
  const [profileImage, setProfileImage] = useState<string | undefined>();

  useEffect(() => {
    const user = async () => {
      const supabaseUser = await supabase.auth.getUser();

      if (!supabaseUser.error) {
        const userImage = supabase.storage
          .from("tastingall-bucket/profiles")
          .getPublicUrl(supabaseUser.data.user!.id);

        setProfileImage(userImage.data.publicUrl);
        setUserData(supabaseUser.data.user);
      }
    };

    user();
  }, []);

  return (
    <>
      {userData ? (
        <Card className="w-[400px] max-sm:w-11/12">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Image
                alt={userData?.user_metadata.userName}
                src={
                  profileImage === undefined
                    ? "/../public/blank-profile-picture.png"
                    : profileImage
                }
                width={50}
                height={50}
                className="rounded-full"
              />
              <CardTitle className="overflow-hidden">
                {userData?.user_metadata.userName}
              </CardTitle>
            </div>
            <CardDescription className="text-left line-clamp-4 pt-5">
              {userData?.user_metadata.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between p-6">
            <SheetActions
              title="Nova Receita"
              content={<FormRecipe />}
              Icon={BookPlus}
              description="Compartilhe uma nova receita"
            />
            <Link
              className="hover:bg-primary/20 rounded-full p-2"
              title="Minhas Receitas"
              href="/recipes"
            >
              <BookDown className="text-primary" aria-label="Minhas Receitas" />
            </Link>
            <SheetActions
              title="Configurações"
              content={<UpdateUser />}
              Icon={Settings2}
              description="Edite as informações do seu perfil"
            />
          </CardContent>
        </Card>
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

export default UserCard;
