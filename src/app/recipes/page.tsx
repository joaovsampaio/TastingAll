import { supabase } from "@/lib/supabaseClient";
import Header from "../components/Header";
import TastingAllCard from "../components/TastingAllCard";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const revalidate = 3600;

async function getRecipes() {
  const { data, error } = await supabase.from("recipes").select("*");

  if (error) {
    throw new Error();
  }

  return data;
}

async function Recipes() {
  const recipes = await getRecipes();

  const formatDate = (createdAt: string) => {
    const date = format(parseISO(createdAt), "dd/MM/yyyy - HH:mm", {
      locale: ptBR,
    });

    return date;
  };

  const getRecipeImage = (image: string) => {
    const recipeImage = supabase.storage
      .from("tastingall-bucket/recipes")
      .getPublicUrl(image);

    return recipeImage.data.publicUrl;
  };

  const getUserImage = (image: string) => {
    const profile = supabase.storage
      .from("tastingall-bucket/profiles")
      .getPublicUrl(image);

    return profile.data.publicUrl;
  };

  const getUserName = async (userId: string) => {
    const { data, error } = await supabase.auth.admin.getUserById(userId);

    console.log(data.user);

    if (!error) {
      return data.user.user_metadata.userName;
    }
  };

  return (
    <>
      <Header isFixed />
      <div className="min-h-screen flex flex-col justify-center items-center">
        {recipes.map((item) => (
          <TastingAllCard
            profileImage={getUserImage(item.created_by as string)}
            userName={getUserName(item.created_by)}
            recipeTitle={item.title}
            category={item.category}
            date={formatDate(item.created_at as string)}
            recipeImage={getRecipeImage(item.image)}
            key={item.id}
          />
        ))}
      </div>
    </>
  );
}

export default Recipes;
