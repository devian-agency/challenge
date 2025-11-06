import Heading from "@/components/ui/heading";
import Code from "@/components/ui/code";

export default function(){
  return (
    <section>
      <Heading>Code Block</Heading>
      <Code className="mx-auto" code={[
        {
        filename: "page.tsx",
        path: "src/app/contact/page.tsx",
        lang: "typescript",
        code:`
        this is a code block
        import codeBck from "code-block";
        export default function CodeBlock(){
        return(
        <code className="code-block">
        code Block
        </code>
        )
        }
        `
         ,
      }
      ]} />
      
    </section>
  )
}