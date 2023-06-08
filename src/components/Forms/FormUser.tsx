"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Input, InputText, Label } from "../ui/formUIComps";
import { Button } from "../ui/button";

const registerSchema = z
  .object({
    userName: z
      .string()
      .min(5, "O mínimo são 5 caracteres.")
      .max(15, "O máximo são 15 caracteres."),
    email: z.string().email("Email inválido"),
    password: z.string().length(6, "Deve conter seis caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "A senha não combina.",
    path: ["confirmPassword"],
  });

type RegisterData = z.infer<typeof registerSchema>;

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({ resolver: zodResolver(registerSchema) });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    try {
      setLoading(true);
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center gap-5"
    >
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

      <div>
        <Label htmlFor="confirmPassword">Confirmar Senha:</Label>
        <Input
          {...register("confirmPassword")}
          type="password"
          id="confirmPassword"
          placeholder="senha"
        />
        <InputText error={errors.confirmPassword ? true : false}>
          {errors.confirmPassword
            ? errors.confirmPassword?.message
            : "Confirme a sua senha."}
        </InputText>
      </div>

      <Button type="submit" disabled={loading}>
        {!loading ? "Criar" : <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      </Button>
    </form>
  );
}

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().length(6, "Deve conter seis caracteres"),
});
type LoginData = z.infer<typeof loginSchema>;

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema) });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      setLoading(true);
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
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
