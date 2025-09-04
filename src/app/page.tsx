import Feeds from "@/_components/Feeds";
import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col justify-center items-center w-full pt-20">
      <h1 className=" head_text text-center">
        Discover and share AI prompts
        <br className="max-md:hidden"></br>
        <span className="text-center orange_gradient"> AI-Powered prompts </span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <Feeds>

      </Feeds>
    </section>
  );
}
