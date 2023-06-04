import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { InputText, Label } from "../ui/formUIComps";

type Props = {
  errors: any;
  onChange: (...event: any[]) => void;
};

function SelectCategory({ errors, onChange }: Props) {
  return (
    <>
      <Label htmlFor="category">Categoria:</Label>
      <Select onValueChange={onChange}>
        <SelectTrigger id="category" className="w-[180px]">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="massa">Massa</SelectItem>
            <SelectItem value="doce">Doce</SelectItem>
            <SelectItem value="lanche">Lanche</SelectItem>
            <SelectItem value="churrasco">Churrasco</SelectItem>
            <SelectItem value="vegano">Vegano</SelectItem>
            <SelectItem value="bebida">Bebida</SelectItem>
            <SelectItem value="molho">Molho</SelectItem>
            <SelectItem value="outro">Outro</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <InputText error={errors ? true : false}>
        {errors ? errors?.message : "Escolha um nome para a sua receita."}
      </InputText>
    </>
  );
}

export default SelectCategory;
