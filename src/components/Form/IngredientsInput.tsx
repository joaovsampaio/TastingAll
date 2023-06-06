import { FieldErrors } from "react-hook-form";
import { Input, InputText, Label } from "../ui/formUIComps";
import { FormData } from "./Form";

type Props = {
  errors: any;
  //onChange: (...event: any[]) => void;
};

function IngredientsInput({ errors }: Props) {
  return (
    <div>
      <Label htmlFor="ingredients">Ingredientes:</Label>
      <Input id="ingredients" />
      <InputText error={errors ? true : false}>
        {errors ? errors.message : "Quais os ingredientes necessários?."}
      </InputText>
    </div>
  );
}

export default IngredientsInput;
