import { Suspense } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FeedRecipes from "./components/FeedRecipes";

export default function Home() {
  return (
    <>
      <Header isFixed />
      <main>
        <Hero />
      </main>
      <div className="flex flex-col justify-center items-center my-5 gap-5">
        <Suspense fallback={<p>Loading..</p>}>
          <FeedRecipes />
        </Suspense>
      </div>
    </>
  );
}
