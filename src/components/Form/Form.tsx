"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "../ui/button";
import { Input, InputText, Label, Textarea } from "../ui/formUIComps";
import SelectCategory from "./SelectCategory";
import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import IngredientsInput from "./IngredientsInput";

// Supabase Rules
const MB_BYTES = 5242880;
const ACCEPTED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const schema = z.object({
  title: z
    .string()
    .min(1, { message: "É necessário um título." })
    .max(30, { message: "O máximo são 15 caracteres." }),
  ingredients: z
    .string({ required_error: "O campo deve ser preenchido." })
    .array()
    .nonempty({ message: "É necessário ao menos um ingrediente." }),
  description: z
    .string()
    .min(1, { message: "É nececessário um modo de preparo." }),
  category: z.string({
    required_error: "É necessário escolher uma categoria.",
  }),
  image: z
    .any()
    .refine((file) => file.length !== 0, "Você deve prover uma imagem.")
    .refine((file) => file[0]?.size <= MB_BYTES, "O tamanho máximo é 5MB.")
    .refine(
      (file) => ACCEPTED_MIME_TYPES.includes(file[0]?.type),
      "Apenas os formatos .jpg, .jpeg, .png e .webp são suportados."
    ),

  /*date: z.string().default(
    Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date())
  ),*/
});
export type FormData = z.infer<typeof schema>;

function Form() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [image, setImage] = useState("");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { data: file, error } = await supabase.storage
      .from("tastingall-bucket/recipes")
      .upload(data.image[0].name, data.image[0], { upsert: true });

    if (file) {
      const supabaseURL = supabase.storage
        .from("tastingall-bucket/recipes")
        .getPublicUrl(file?.path);

      const updatedData = { ...data, image: supabaseURL.data.publicUrl };

      const postRecipe = await supabase
        .from("recipes")
        .insert([{ ...updatedData }]);

      return postRecipe;
    }

    if (error) return console.log(error);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-5"
      >
        <div>
          <Label htmlFor="title">Nome:</Label>
          <Input
            {...register("title")}
            type="text"
            id="title"
            placeholder="Nome da receita"
          />
          <InputText error={errors.title ? true : false}>
            {errors.title
              ? errors.title?.message
              : "Escolha um nome para a sua receita."}
          </InputText>
        </div>

        <div>
          <Controller
            control={control}
            name="ingredients"
            render={({ fieldState: { error } }) => (
              <IngredientsInput errors={error} setValue={setValue} />
            )}
          />
        </div>

        <div>
          <Label htmlFor="description">Modo de Preparo:</Label>
          <Textarea
            {...register("description")}
            id="description"
            placeholder="Modo de Preparo"
          />
          <InputText error={errors.description ? true : false}>
            {errors.description
              ? errors.description?.message
              : "Expique o passo a passo da sua receita."}
          </InputText>
        </div>

        <div>
          <Label htmlFor="image">Imagem:</Label>
          <Input
            className="h-auto"
            {...register("image")}
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files![0].name)}
          />
          <InputText error={errors.image ? true : false}>
            {errors.image
              ? (errors.image?.message as any)
              : "máximo de 5MB. formatos: jpeg, jpg, png,webp."}
          </InputText>
        </div>

        {image && (
          <Image
            alt="teste"
            src={`/${image}`}
            width={200}
            height={200}
            className="self-center"
          />
        )}

        <div>
          <Controller
            control={control}
            name="category"
            render={({ field, fieldState: { error } }) => (
              <SelectCategory onChange={field.onChange} errors={error} />
            )}
          />
        </div>
        <Button type="submit">Publicar</Button>
      </form>
    </>
  );
}

export default Form;
