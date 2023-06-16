import { supabase } from "@/lib/supabaseClient";
import { formatDate } from "@/lib/utils";
import TastingAllCard from "../../components/TastingAllCard";
import { UserCard } from "@/app/components/UserCard";

export const revalidate = 3600;

async function getRecipes(userId: string) {
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error();
  }

  return data;
}

async function getUserById(userId: string) {
  const {
    data: { user },
    error,
  } = await supabase.auth.admin.getUserById(userId);

  if (!error) {
    return user;
  }
}

async function Profile({ params }: { params: { userId: string } }) {
  const recipes = await getRecipes(params.userId);
  const user = await getUserById(params.userId);

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

  return (
    <main>
      <div className="min-h-screen flex flex-col justify-center items-center gap-5 mt-20 mb-5">
        <div className="flex justify-center">
          <UserCard
            userName={user?.user_metadata.userName}
            profileImage={getUserImage(user?.id as string)}
            description={user?.user_metadata.description}
            descriptionStyle="line-clamp-none"
            userId={params.userId}
          />
        </div>
        {recipes.map((item) => (
          <TastingAllCard
            profileImage={getUserImage(item.user_id as string)}
            userName={user?.user_metadata.userName}
            recipeTitle={item.title}
            category={item.category}
            date={formatDate(item.created_at as string)}
            recipeImage={getRecipeImage(item.image)}
            recipeId={item.id}
            userId={item.user_id}
            key={item.id}
          />
        ))}
      </div>
    </main>
  );
}

export default Profile;
