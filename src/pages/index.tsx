import { useTheme } from "next-themes";

import AboutFLC from "~/components/landing/aboutFLC";
import Benifits from "~/components/landing/benifits";
import Events from "~/components/landing/event";
import Hackfest from "~/components/landing/hackfest";
import Hero from "~/components/landing/hero";
import Projects from "~/components/landing/project";
import Roadmap from "~/components/landing/roadmap";
import TechStack from "~/components/landing/techStack";
import { cn } from "~/lib/utils";

export default function Home() {
  const { theme } = useTheme();

  return (
    <main className="flex flex-col items-stretch">
      <div className="absolute h-screen w-screen bg-gradient-to-t from-[#ffffff] via-[#efd17bc7] to-[#ffed951a] dark:bg-none"></div>
      <video
        src="waves.webm"
        autoPlay
        muted
        loop
        className={cn(
          "absolute top-[45%] w-full md:top-[22%]",
          theme === "dark" ? "brightness-100" : "brightness-75 ",
        )}
      />
      <Hero />
      <div className="bg-gradient">
        <AboutFLC />
        <Roadmap />
      </div>
      <Hackfest />
      <div className="bg-gradient">
        <Projects />
        <div>
          <h1 className="subheading p-4 text-center">
            “ Technology Stack Our Club Works With ❞
          </h1>
          <TechStack />
        </div>
        <Events />
        <Benifits />
      </div>
    </main>
  );
}
