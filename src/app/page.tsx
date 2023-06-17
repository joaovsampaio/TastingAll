import { Suspense } from "react";
import Hero from "./components/Hero";
import FeedRecipes from "./components/FeedRecipes";
import CardSkeleton from "./components/ui/cardSkeleton";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="flex flex-col justify-center items-center my-5 gap-5">
        <Suspense fallback={<CardSkeleton />}>
          <FeedRecipes />
        </Suspense>
      </div>
    </main>
  );
}
