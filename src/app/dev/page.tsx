import Heading from "@/components/ui/heading";

export default function DevPage() {
  return (
    <section className="relative h-full">
      <div className="absolute blur-2xl w-1/3 top-0 left-0 aspect-square rounded-full bg-linear-60 from-[#f124fa] via-[#ed892c] to-[#30faaf] ">
      </div>
      <div className="absolute right-0 blur-3xl bottom-0 w-1/3 aspect-square rounded-full bg-linear-60 from-[#27f627] to-[#1ac1eb]">
      </div>
      <div className="absolute size-6/7 left-1/2 top-1/2 -translate-1/2 bg-white/10 backdrop-blur-3xl">
      <Heading className="mt-64">
        Welcome to Devian, where you can unleash your creativity and build amazing applications with ease!
      </Heading>
      </div>
    </section>
  );
}
