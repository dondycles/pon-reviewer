"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  const modules = [
    {
      name: "Module 1",
      link: "/module/m1",
    },
    {
      name: "Module 2",
      link: "/module/m2",
    },
    {
      name: "Module 3",
      link: "/module/m3",
    },
    {
      name: "Module 4",
      link: "/module/m4",
    },
    {
      name: "Module 5",
      link: "/module/m5",
    },
    {
      name: "Module 6",
      link: "/module/m6",
    },
    {
      name: "Module 7",
      link: "/module/m7",
    },
  ];

  return (
    <main className="h-full w-full p-4  sm:px-8 md:px-32 lg:px-64 xl:px-80 overflow-auto">
      <p className="text-2xl text-primary font-bold text-center">Ibong Tirit</p>
      <div className="mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid gap-4 ">
        {modules.map((module) => {
          return (
            <Link href={module.link}>
              <Card className="text-center hover:bg-primary/15">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">
                    {module.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
