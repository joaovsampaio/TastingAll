import { supabase } from "@/lib/supabaseClient";
import Header from "../../components/Header";
import TastingAllCard from "../../components/TastingAllCard";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import UserCard from "@/app/components/UserCard";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600;

async function getRecipes(userId: string) {
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("created_by", userId);

  if (error) {
    throw new Error();
  }

  return data;
}

async function Recipes({ params }: { params: { userId: string } }) {
  const recipes = await getRecipes(params.userId);

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
      <div className="min-h-screen flex flex-col justify-center items-center gap-5 mt-20 mb-5">
        <div className="flex justify-center">
          <UserCard
            width="w-2/4"
            profileLink={true}
            recipesNumber={recipes.length}
          />
        </div>
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
