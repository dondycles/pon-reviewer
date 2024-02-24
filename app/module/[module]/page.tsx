"use client";
import Question from "@/components/question";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import { shuffleMode, useScore } from "@/store";
import { MdError } from "react-icons/md";
import { LuLoader2 } from "react-icons/lu";
import { Button } from "@/components/ui/button";
export default function Module({ params }: { params: { module: string } }) {
  const navScore = useScore();
  const shuffledMode = shuffleMode().mode;

  const shuffleArray = (array: any[]) => {
    if (!Array.isArray(array)) {
      console.error("Input is not an array.");
      return;
    }
    // Create a copy of the original array
    const shuffledArray = array.slice();

    // Perform Fisher-Yates shuffle algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    // Return the shuffled array
    return shuffledArray;
  };
  const fetchShuffledQuestions = useMemo(async () => {
    const data = await fetch(`/${params.module}.json`).then((res) => {
      return res.json();
    });
    return shuffleArray(data);
  }, []);

  const fetchUnshuffledQuestions = useMemo(async () => {
    const data = await fetch(`/${params.module}.json`).then((res) => {
      return res.json();
    });
    return data;
  }, []);

  const { data, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryFn: async ({ pageParam }) => {
        const from = pageParam === 1 ? 0 : (pageParam - 1) * 10;
        const to = from + 9;
        const questionsData = shuffledMode
          ? await fetchShuffledQuestions
          : await fetchUnshuffledQuestions;
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return questionsData.slice(from, to);
      },
      queryKey: ["module", params.module, shuffledMode],
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialPageParam: 1,
    });

  const questions = data?.pages.flatMap((question) => question);

  const lastPost = useRef<HTMLDivElement>(null);

  const { ref: veryLastPost, entry } = useIntersection({
    root: lastPost.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage]);

  return (
    <main className="h-full w-full grid-cols-1 grid p-4 sm:px-8 md:px-32 lg:px-64 xl:px-80 gap-4 overflow-auto">
      {isLoading ? (
        <div className="animate-pulse text-xs flex flex-row gap-2 items-center justify-center">
          <p>Fetching module</p>
          <span>
            <LuLoader2 className="animate-spin" />
          </span>
        </div>
      ) : (
        <>
          {data ? (
            <>
              {questions?.map((question) => {
                return (
                  <Question
                    correct={() => {
                      navScore.setScore(navScore.score + 1);
                    }}
                    question={question}
                    key={question.question}
                  />
                );
              })}
              <div ref={veryLastPost} className="w-full" />
              {isFetchingNextPage && (
                <div className="animate-pulse text-xs flex flex-row gap-2 items-center justify-center">
                  <p>Fetching next questions</p>
                  <span>
                    <LuLoader2 className="animate-spin" />
                  </span>
                </div>
              )}{" "}
            </>
          ) : (
            <div className="text-xs flex flex-row gap-2 items-center justify-center text-destructive">
              <p>Module not found</p>
              <span>
                <MdError />
              </span>
            </div>
          )}
        </>
      )}
    </main>
  );
}
