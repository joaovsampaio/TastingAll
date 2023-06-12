"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/lib/supabaseClient";

import SelectCategory from "./SelectCategory";
import IngredientsInput from "./IngredientsInput";
import { Button } from "../../ui/button";
import { Input, InputText, Label, Textarea } from "../../ui/formUIComps";
import { useToast } from "@/lib/use-toast";

// Supabase Rules
const MB_BYTES = 5242880;
const ACCEPTED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const schema = z.object({
  id: z.string().default(uuidv4()),
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
  created_by: z.string(),
});
export type FormData = z.infer<typeof schema>;

function FormRecipe() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const { data: user, error } = await supabase.auth.getUser();

      if (!error) return setValue("created_by", user.user!.id);
    };

    getUser();
  }, [setValue]);

  const postRecipe = async (recipe: FormData) => {
    await supabase.from("recipes").insert([{ ...recipe }]);
  };

  const storageImage = async (data: FormData) => {
    const { data: image, error } = await supabase.storage
      .from("tastingall-bucket/recipes")
      .upload(data.id, data.image[0], {
        upsert: true,
      });

    const updatedData = { ...data, image: image?.path };

    if (!error) return postRecipe(updatedData);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setLoading(true);
      await storageImage(data);
      toast({
        title: data.title,
        description: `${data.title} criado com sucesso.`,
      });
    } catch {
      toast({
        title: "Ops, algo deu errado!",
        description: "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
          />
          <InputText error={errors.image ? true : false}>
            {errors.image
              ? (errors.image?.message as any)
              : "máximo de 5MB. formatos: jpeg, jpg, png,webp."}
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
        <Button type="submit" disabled={loading}>
          {!loading ? (
            "Publicar"
          ) : (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
        </Button>
      </form>
    </>
  );
}

export default FormRecipe;
