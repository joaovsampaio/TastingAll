"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, LogOut } from "lucide-react";

import { supabase } from "@/lib/supabaseClient";
import { Input, InputText, Label, Textarea } from "../../ui/formUIComps";
import { Button } from "../../ui/button";
import { useToast } from "@/lib/use-toast";
import { useRouter } from "next/navigation";
import { CustomAlertDialog } from "../../ui/alert-dialog";

// Supabase Rules
const MB_BYTES = 5242880;
const ACCEPTED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const updateUserSchema = z.object({
  profileImage: z
    .any()
    .refine((file) => file.length !== 0, "Você deve prover uma imagem.")
    .refine((file) => file[0]?.size <= MB_BYTES, "O tamanho máximo é 5MB.")
    .refine(
      (file) => ACCEPTED_MIME_TYPES.includes(file[0]?.type),
      "Apenas os formatos .jpg, .jpeg, .png e .webp são suportados."
    ),
  userName: z
    .string()
    .min(5, "O mínimo são 5 caracteres.")
    .max(15, "O máximo são 15 caracteres."),
  description: z
    .string()
    .min(5, "O mínimo são 5 caracteres.")
    .max(500, "O máximo são 500 caracteres."),
});

type UpdateUserData = z.infer<typeof updateUserSchema>;

function UpdateUser() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (!error) {
        setValue("userName", data.user.user_metadata.userName);
        setValue("description", data.user.user_metadata.description);
      }
    };

    getUser();
  }, []);

  const storageImage = async (data: UpdateUserData) => {
    const { data: user, error } = await supabase.auth.getUser();

    if (!error) {
      await supabase.storage
        .from("tastingall-bucket/profiles")
        .upload(user.user!.id, data.profileImage[0], {
          upsert: true,
        });
    } else {
      toast({
        title: "Não conseguimos armazenar a sua foto.",
        description: "Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Não foi possível sair.",
        description: "Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const onSubmit: SubmitHandler<UpdateUserData> = async (data) => {
    setLoading(true);
    await storageImage(data);
    const {
      data: { user },
      error,
    } = await supabase.auth.updateUser({
      data: {
        userName: data.userName,
        description: data.description,
      },
    });

    if (!error) {
      toast({
        title: "Dados Atualizados",
      });
      router.push(`/profile/${user?.id}`);
    } else {
      toast({
        title: "Algo deu errado!",
        description: "Tente novamente.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-5"
      >
        <div>
          <Label htmlFor="profileImage">Imagem De Perfil:</Label>
          <Input
            className="h-auto"
            {...register("profileImage")}
            type="file"
            id="profileImage"
          />
          <InputText error={errors.profileImage ? true : false}>
            {errors.profileImage
              ? (errors.profileImage?.message as any)
              : "máximo de 5MB. formatos: jpeg, jpg, png,webp."}
          </InputText>
        </div>

        <div>
          <Label htmlFor="userName">Nome de usuário:</Label>
          <Input
            {...register("userName")}
            type="text"
            id="userName"
            placeholder="Jon Doe"
          />
          <InputText error={errors.userName ? true : false}>
            {errors.userName
              ? errors.userName?.message
              : "Escolha um nome de usuário."}
          </InputText>
        </div>

        <div>
          <Label htmlFor="description">Descrição:</Label>
          <Textarea
            {...register("description")}
            id="description"
            placeholder="Descrição"
          />
          <InputText error={errors.description ? true : false}>
            {errors.description
              ? errors.description?.message
              : "Conte um pouco sobre você."}
          </InputText>
        </div>

        <Button type="submit" disabled={loading}>
          {!loading ? (
            "Atualizar"
          ) : (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
        </Button>
      </form>
      <div className="flex justify-end my-4">
        <CustomAlertDialog
          triggerText={<LogOut className="text-destructive" />}
          title="Sair?"
          description="Tem certeza que deseja sair?"
          onActionClick={logOut}
        />
      </div>
    </>
  );
}

export default UpdateUser;
