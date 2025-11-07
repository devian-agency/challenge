import Heading from "@/components/ui/heading"
import P from "@/components/ui/p"
import Link from "next/link"
import Button from "@/components/ui/button"
import { Twitter } from "@/components/ui/twitter"

export default function About(){
  return (
    <section className="flex justify-center items-center h-full">
      <div className="">
        <Heading as="h1">
          About Me
        </Heading>
        
        <P className="text-balance md:max-w-3xl mt-10">Hello, i'm <strong>Gajender</strong>!</P>
        <P className="text-balance md:max-w-3xl">I'm a self-taught full-stack developer based in Gwaior, India. I can develop responsive websites from scratch and raise them into modern user-friendly web experiences.</P>
        <P className="text-balance md:max-w-3xl">Transforming my creativity and knowledge into a websites has been my passion for over 5 years. I have been helping various clients to establish their presence online. I always strive to learn about the newest technologies and frameworks.</P>
        <Link href={"https://x.com/Averrraagggeeee"} className="flex">
          <Button className="mx-auto mt-10 rounded-md">
            <span className="flex items-center gap-2">
              <Twitter size={24} hold={3} /> Know More
            </span>
          </Button>
        </Link>
      </div>
    </section>
  )
}