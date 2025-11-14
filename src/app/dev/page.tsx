"use client";
import Carousel from "@/components/ui/carousel";
import P from "@/components/ui/p";
import Heading from "@/components/ui/heading";

export default function DevPage() {
  return (
    <section className="w-full max-w-7xl mx-auto justify-center items-center flex flex-col px-6 h-full">
      <Heading className="">
        Trusted by leading companies
      </Heading>
      <Carousel speed={10}>
        <P className="text-gray-500">Amazon</P>
        <P className="text-gray-500">Flipkart</P>
        <P className="text-gray-500">BlinkIt</P>
        <P className="text-gray-500">Meesho</P>
        <P className="text-gray-500">Mintra</P>
        <P className="text-gray-500">Shopsy</P>
        <P className="text-gray-500">Big Basket</P>
        <P className="text-gray-500">Jio Mart</P>
        <P className="text-gray-500">Zomato</P>
        <P className="text-gray-500">Swiggy</P>
      </Carousel>
    </section>
  );
}
