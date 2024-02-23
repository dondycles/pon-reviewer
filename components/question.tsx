"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import { useScore } from "@/store";
export type Questions = {
  question: string;
  choices: string[];
  answer: string;
};
export default function Question({
  question,
  correct,
}: {
  question: Questions;
  correct: () => void;
}) {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid-cols-2 grid gap-4">
        {question.choices.map((choice) => {
          return (
            <Choice
              correct={() => correct()}
              key={choice}
              answer={question.answer}
              choice={choice}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}

function Choice({
  choice,
  answer,
  correct,
}: {
  choice: string;
  answer: string;
  correct: () => void;
}) {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const score = useScore();

  return (
    <Button
      className={`
      border-solid border-[1px]
      ${
        choice === answer
          ? isCorrect
            ? "bg-green-500 border-green-500"
            : null
          : isCorrect === false && "bg-red-500 border-red-500"
      }
      h-full
      `}
      onClick={() => {
        if (choice === answer) {
          setIsCorrect(true);
          correct();
        } else {
          setIsCorrect(false);
        }
      }}
      variant={"secondary"}
    >
      <p className="w-full text-wrap">{choice}</p>
    </Button>
  );
}
