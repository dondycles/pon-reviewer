"use client";
import { useScore, shuffleMode as useShuffleMode } from "@/store";
import { ThemeToggle } from "./theme-btn";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { GrReturn } from "react-icons/gr";
import { useEffect, useState } from "react";
export default function Nav() {
  const currentModuleScore = useScore();
  const route = useRouter();
  const pathname = usePathname();
  const [totalItems, setTotalItems] = useState(0);
  const fetchQuestions = async (module: string) => {
    try {
      const data = await fetch(`/${module}.json`).then((res) => {
        return res.json();
      });
      setTotalItems(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!pathname) return;
    fetchQuestions(pathname.replace("/module/", ""));
    currentModuleScore.setScore(0);
  }, [pathname]);

  return (
    <header className="sticky top-0 left-0 w-full flex flex-row gap-4 justify-between  p-4 sm:px-8 md:px-32 lg:px-64 xl:px-80 border-b-border border-b-[1px] backdrop-blur-sm items-center bg-background/80 z-10">
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
        <div className="flex flex-1 items-center gap-4">
          <Button size={"icon"} onClick={() => route.push("/")}>
            <GrReturn className="text-xl" />
          </Button>
          <p className="text-sm">Module {pathname.replace("/module/m", "")}</p>
          <Badge variant="outline" className="ml-auto mr-0">
            Score: {currentModuleScore.score} / {totalItems}
          </Badge>
        </div>
      )}
      <ThemeToggle />
    </header>
  );
}
