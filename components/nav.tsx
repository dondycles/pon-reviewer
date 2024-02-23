"use client";
import { shuffleMode as useShuffleMode } from "@/store";
import { ThemeToggle } from "./theme-btn";
import { Button } from "./ui/button";

export default function Nav() {
  const shuffleMode = useShuffleMode();
  return (
    <header className="sticky top-0 left-0 w-full flex flex-row gap-4 justify-between  p-4 sm:px-8 md:px-32 lg:px-64 xl:px-80 border-b-border border-b-[1px] backdrop-blur-sm">
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
      <ThemeToggle />
    </header>
  );
}
