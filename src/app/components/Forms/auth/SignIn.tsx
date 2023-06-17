"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Input, InputText, Label } from "../../ui/formUIComps";
import { Button } from "../../ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/lib/use-toast";

const signInSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().length(6, "Deve conter seis caracteres"),
});
type SignInData = z.infer<typeof signInSchema>;

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({ resolver: zodResolver(signInSchema) });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (!error) {
      toast({ title: data.email });
      router.push("/");
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center gap-5"
    >
      <div>
        <Label htmlFor="email">Email:</Label>
        <Input
          {...register("email")}
          type="email"
          id="email"
          placeholder="exemplo@email.com"
        />
        <InputText error={errors.email ? true : false}>
          {errors.email ? errors.email?.message : "Escolha um email."}
        </InputText>
      </div>

      <div>
        <Label htmlFor="password">Senha:</Label>
        <Input
          {...register("password")}
          type="password"
          id="password"
          placeholder="senha"
        />
        <InputText error={errors.password ? true : false}>
          {errors.password
            ? errors.password?.message
            : "A senha deve conter 6 caracteres."}
        </InputText>
      </div>

      <Button type="submit" disabled={loading}>
        {!loading ? (
          "Entrar"
        ) : (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
      </Button>
    </form>
  );
}

export default SignIn;
