"use client";
import { useScore, shuffleMode as useShuffleMode } from "@/store";
import { ThemeToggle } from "./theme-btn";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { GrReturn } from "react-icons/gr";
import { useEffect } from "react";
export default function Nav() {
  const currentModuleScore = useScore();
  const route = useRouter();
  const pathname = usePathname();
  const shuffle = useShuffleMode();

  useEffect(() => {
    if (!pathname) return;
    currentModuleScore.setScore(0);
    shuffle.setMode(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 left-0 w-full flex flex-row gap-4 justify-between  p-4 sm:px-8 md:px-32 lg:px-64 xl:px-80 border-b-border border-b-[1px] backdrop-blur-sm items-center bg-background/80 z-10">
      {pathname != "/" && (
        <nav className="flex flex-1 items-center gap-4">
          <Button size={"icon"} onClick={() => route.push("/")}>
            <GrReturn className="text-xl" />
          </Button>
          <p className="text-sm">Module {pathname.replace("/module/m", "")}</p>
        </nav>
      )}
      <ThemeToggle />
    </header>
  );
}
