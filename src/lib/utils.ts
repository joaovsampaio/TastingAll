import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(createdAt: string) {
  const date = format(parseISO(createdAt), "dd/MM/yyyy - HH:mm", {
    locale: ptBR,
  });

  return date;
}

export const delayFetch = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
