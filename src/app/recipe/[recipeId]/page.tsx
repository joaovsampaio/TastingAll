import Image from "next/image";
import { Inter } from "next/font/google";
import { supabase } from "@/lib/supabaseClient";
import { formatDate } from "@/lib/utils";
import { Separator } from "@/app/components/ui/separator";
import { Badge } from "@/app/components/ui/badge";

const inter = Inter({ subsets: ["latin"], weight: "900" });

export const revalidate = 3600;

async function getRecipe(recipeId: string) {
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", recipeId);

  if (error) {
    throw new Error();
  }

  return data;
}

async function Recipe({ params }: { params: { recipeId: string } }) {
  const recipe = await getRecipe(params.recipeId);

  const getUserName = async (userId: string) => {
    const { data, error } = await supabase.auth.admin.getUserById(userId);

    if (!error) {
      return data.user.user_metadata.userName;
    }
  };

  const getRecipeImage = (image: string) => {
    const recipeImage = supabase.storage
      .from("tastingall-bucket/recipes")
      .getPublicUrl(image);

    return recipeImage.data.publicUrl;
  };

  return (
    <main className="min-h-screen flex flex-col items-center mt-28">
      {recipe.map((item) => (
        <div
          key={item.id}
          className="flex flex-col w-2/4 max-md:w-11/12 gap-5 mb-10"
        >
          <h1
            style={inter.style}
            className="text-primary max-md:text-4xl text-6xl uppercase self-start"
          >
            {item.title}
          </h1>
          <div className="flex items-center justify-between max-md:flex-col max-md:items-start">
            <Badge variant="outline">
              <p>{getUserName(item.user_id)}</p>
            </Badge>
            <div className="flex gap-3 max-md:mt-2">
              <Badge>
                <p>{item.category}</p>
              </Badge>
              <Badge variant="secondary">
                <time>{formatDate(item.created_at as string)}</time>
              </Badge>
            </div>
          </div>
          <Separator />
          <div className="relative w-full min-h-[15rem] my-5 self-center">
            <Image
              alt={item.title}
              src={getRecipeImage(item.image)}
              fill
              className="object-contain "
            />
          </div>
          <div className="flex flex-col gap-6">
            <h2
              style={inter.style}
              className="text-primary max-md:text-2xl text-4xl uppercase"
            >
              Ingredientes
            </h2>
            <ul className="lg:text-lg">
              {item.ingredients.map((item, index) => (
                <li className="list-disc list-inside" key={index}>
                  {item}
                </li>
              ))}
            </ul>
            <h2
              style={inter.style}
              className="text-primary max-md:text-2xl text-4xl uppercase"
            >
              Modo de preparo
            </h2>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </main>
  );
}

export default Recipe;
