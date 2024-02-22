"use client";
import { Questions } from "@/app/page";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";

export default function Question({ question }: { question: Questions }) {
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
            <Choice key={choice} answer={question.answer} choice={choice} />
          );
        })}
      </CardContent>
    </Card>
  );
}

function Choice({ choice, answer }: { choice: string; answer: string }) {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  return (
    <Button
      //   className={`${
      //     choice === answer
      //       ? isCorrect
      //         ? "bg-green-500"
      //         : null
      //       : isCorrect === false && "bg-red-500"
      //   }
      //   h-full
      //   `}
      className="h-full"
      onClick={() => {
        if (choice === answer) {
          setIsCorrect(true);
        } else {
          setIsCorrect(false);
        }
      }}
      variant={
        choice === answer
          ? isCorrect
            ? "default"
            : "secondary"
          : (isCorrect === false && "destructive") || "secondary"
      }
    >
      <p className="w-full text-wrap">{choice}</p>
    </Button>
  );
}
