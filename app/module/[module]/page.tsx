"use client";
import Question from "@/components/question";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { useScore } from "@/store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export default function Module({ params }: { params: { module: string } }) {
  const navScore = useScore();

  const fetchQuestions = async () => {
    const data = await fetch(
      `http://localhost:3000/${params.module}.json`
    ).then((res) => {
      return res.json();
    });
    return data;
  };

  const { data, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryFn: async ({ pageParam }) => {
        const from = pageParam === 1 ? 0 : (pageParam - 1) * 10;
        const to = from + 9;
        const questionsData = await fetchQuestions();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return questionsData.slice(from, to);
      },
      queryKey: ["module", params.module],
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

  if (isLoading)
    return (
      <div className="animate-pulse h-full w-full grid-cols-1 grid p-4 sm:px-8 md:px-32 lg:px-64 xl:px-80 gap-4 overflow-auto text-center text-xs">
        Loading questions
      </div>
    );
  return (
    <main className="h-full w-full grid-cols-1 grid p-4 sm:px-8 md:px-32 lg:px-64 xl:px-80 gap-4 overflow-auto">
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
        <p className="text-center text-xs animate-pulse">
          Loading more questions
        </p>
      )}
    </main>
  );
}
