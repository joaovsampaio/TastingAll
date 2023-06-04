import Form from "@/components/Form/Form";
import Hero from "@/components/Hero";
import TastingAllCard from "@/components/TastingAllCard";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="flex flex-col justify-center items-center my-5">
        <Form />
        <TastingAllCard />
        <TastingAllCard />
        <TastingAllCard />
      </div>
    </main>
  );
}
