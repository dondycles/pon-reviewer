"use client";
import { useScore, shuffleMode as useShuffleMode } from "@/store";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Shuffle } from "lucide-react";
export default function FloatingMenu() {
  const currentModuleScore = useScore();
  const pathname = usePathname();
  const [totalItems, setTotalItems] = useState(0);
  const shuffle = useShuffleMode();
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
    shuffle.setMode(false);
  }, [pathname]);

  return (
    <div className="fixed bottom-4 right-1/2 translate-x-1/2 w-fit px-4 py-1 rounded-full z-10 flex flex-row gap-4 bg-card border-border border-[1px] items-center">
      <p className="h-fit text-sm text-muted-foreground">
        Score:{" "}
        <span className="text-foreground">{currentModuleScore.score}</span> /{" "}
        {totalItems}
      </p>
      <Button
        onClick={() => {
          shuffle.setMode(!shuffle.mode);
          currentModuleScore.setScore(0);
        }}
        variant={shuffle.mode ? "default" : "outline"}
        size={"icon"}
      >
        <Shuffle className="h-5 w-5" />
      </Button>
    </div>
  );
}
