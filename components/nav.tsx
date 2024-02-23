"use client";
import { useScore, shuffleMode as useShuffleMode } from "@/store";
import { ThemeToggle } from "./theme-btn";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { GrReturn } from "react-icons/gr";
import { useEffect } from "react";
export default function Nav() {
  const shuffleMode = useShuffleMode();
  const currentModuleScore = useScore();
  const route = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    currentModuleScore.setScore(0);
  }, [pathname]);

  return (
    <header className="sticky top-0 left-0 w-full flex flex-row gap-4 justify-between  p-4 sm:px-8 md:px-32 lg:px-64 xl:px-80 border-b-border border-b-[1px] backdrop-blur-sm items-center">
      {/* <div className="flex gap-4">
        <Button
          variant={shuffleMode.mode ? "default" : "outline"}
          onClick={() => shuffleMode.setMode(true)}
        >
          Shuffled
        </Button>
        <Button
          variant={!shuffleMode.mode ? "default" : "outline"}
          onClick={() => shuffleMode.setMode(false)}
        >
          Unshuffled
        </Button>
      </div> */}

      {pathname != "/" && (
        <div className="flex items-center gap-4">
          <Button size={"icon"} onClick={() => route.push("/")}>
            <GrReturn className="text-xl" />
          </Button>
          <Badge variant="outline">
            Ibong Tiririt {pathname.toLocaleUpperCase()} Score:{" "}
            {currentModuleScore.score}
          </Badge>
        </div>
      )}
      <ThemeToggle />
    </header>
  );
}
