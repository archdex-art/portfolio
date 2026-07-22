import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Stack } from "@/components/sections/Stack";
import { Journey } from "@/components/sections/Journey";
import { Recognition } from "@/components/sections/Recognition";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Stack />
      <Journey />
      <Recognition />
      <Contact />
    </>
  );
}
