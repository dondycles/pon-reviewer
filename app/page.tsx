"use client";
import Question from "@/components/question";
import { useEffect, useState } from "react";
import { shuffleMode as useShuffleMode } from "@/store";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  const modules = [
    {
      name: "Ibong Tiririt 1",
      link: "/m1",
    },
    {
      name: "Ibong Tiririt 2",
      link: "/m2",
    },
    {
      name: "Ibong Tiririt 3",
      link: "/m3",
    },
    {
      name: "Ibong Tiririt 4",
      link: "/m4",
    },
    {
      name: "Ibong Tiririt 5",
      link: "/m5",
    },
    {
      name: "Ibong Tiririt 6",
      link: "/m6",
    },
    {
      name: "Ibong Tiririt 7",
      link: "/m7",
    },
  ];

  return (
    <main className="h-full w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid p-4 sm:px-8 md:px-32 lg:px-64 xl:px-80 gap-4 overflow-auto">
      {modules.map((module) => {
        return (
          <Link href={module.link}>
          <Card className="text-center">
            <CardHeader>
              <CardTitle>{module.name}</CardTitle>
            </CardHeader>
          </Card>
          </Link>

        );
      })}
    </main>
  );
}
