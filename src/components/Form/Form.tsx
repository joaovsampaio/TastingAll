"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "../ui/button";
import { Input, InputText, Label, Textarea } from "../ui/formUIComps";
import SelectCategory from "./SelectCategory";
import { useState } from "react";
import Image from "next/image";

const schema = z.object({
  title: z
    .string()
    .min(1, { message: "É necessário um título." })
    .max(30, { message: "O máximo são 15 caracteres." }),
  image: z
    .any()
    .refine((file) => file?.size === 0, "Você deve prover uma imagem.")
    .refine((file) => file?.size <= 500000, "O tamanho máximo é 5MB.")
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file?.type
        ),
      "Apenas os formatos .jpg, .jpeg, .png e .webp são suportados."
    ),
  category: z.string({
    required_error: "É necessário escolher uma categoria.",
  }),
  description: z
    .string()
    .min(1, { message: "É nececessário um modo de preparo." }),
  /*ingredients: z
    .string()
    .array()
    .nonempty({ message: "É necessário ao menos um ingrediente." }),*/
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
    clearErrors,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log(data.image);
    } catch (e) {
      console.log(e);
    }
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
            placeholder="imagem"
          />
          <InputText error={errors.image ? true : false}>
            {errors.image
              ? (errors.image?.message as any)
              : "Escolha uma imagem."}
          </InputText>
        </div>

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
