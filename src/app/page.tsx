import Header from "./components/Header";
import Hero from "./components/Hero";
import TastingAllCard from "./components/TastingAllCard";

export default function Home() {
  return (
    <>
      <Header isFixed />
      <main>
        <Hero />
      </main>
      <div className="flex flex-col justify-center items-center my-5 gap-5">
        <TastingAllCard />
        <TastingAllCard />
        <TastingAllCard />
      </div>
    </>
  );
}
