"use client";

import { FieldError, UseFormSetValue } from "react-hook-form";
import { Input, InputText, Label } from "../ui/formUIComps";
import { FormData, schema } from "./FormRecipe";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  errors: FieldError | undefined;
  setValue: UseFormSetValue<FormData>;
};

function IngredientsInput({ errors, setValue }: Props) {
  const [ingredients, setIngredients] = useState<any>([]);
  const [input, setInput] = useState("");

  const onFormPress = () => {
    setIngredients([...ingredients, input]);
    setInput("");
  };

  useEffect(() => setValue("ingredients", ingredients), [ingredients]);

  const checkKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.key === "Enter" && e.preventDefault();
    e.key === "Enter" && onFormPress();
  };

  const deleteIngredient = (id: number) => {
    setIngredients(
      ingredients.filter((_: any, index: number) => {
        return index !== id;
      })
    );
  };

  return (
    <>
      <Label htmlFor="ingredients">Ingredientes:</Label>
      <div className="flex items-center gap-1">
        <Input
          id="ingredients"
          value={input}
          onKeyDown={(e) => checkKeyDown(e)}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="button" onClick={() => onFormPress()}>
          Adicionar
        </Button>
      </div>
      <InputText error={errors ? true : false}>
        {errors ? errors.message : "Quais os ingredientes necessários?"}
      </InputText>
      <ul className="mt-2">
        <AnimatePresence>
          {ingredients.map(
            (item: typeof schema._type.ingredients, index: number) => (
              <motion.li
                key={index}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between mx-5 my-1"
              >
                {item}
                <XCircle
                  aria-label="deletar"
                  className="text-red-500 hover:bg-red-200 hover:cursor-pointer rounded-full"
                  onClick={() => deleteIngredient(index)}
                />
              </motion.li>
            )
          )}
        </AnimatePresence>
      </ul>
    </>
  );
}

export default IngredientsInput;
