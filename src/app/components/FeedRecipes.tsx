import Link from "next/link";

import { supabase } from "@/lib/supabaseClient";
import { formatDate } from "@/lib/utils";
import TastingAllCard from "./TastingAllCard";

export const revalidate = 3600;

async function getRecipes() {
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error();
  }

  return data;
}

async function FeedRecipes() {
  const recipes = await getRecipes();

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

    if (!error) {
      return data.user.user_metadata.userName;
    }
  };

  return (
    <>
      {recipes.map((item) => (
        <article key={item.id} className="flex flex-col items-center w-full">
          <Link
            className="flex flex-col items-center w-full hover:opacity-90"
            href={`/recipe/${item.id}`}
          >
            <TastingAllCard
              profileImage={getUserImage(item.user_id as string)}
              userName={getUserName(item.user_id)}
              recipeTitle={item.title}
              category={item.category}
              date={formatDate(item.created_at as string)}
              recipeImage={getRecipeImage(item.image)}
              recipeId={item.id}
              userId={item.user_id}
              key={item.id}
            />
          </Link>
        </article>
      ))}
    </>
  );
}

export default FeedRecipes;
