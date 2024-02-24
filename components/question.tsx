"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import Confetti from "react-dom-confetti";
import { Badge } from "./ui/badge";

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
  const [chances, setChances] = useState(2);
  const [isCorrect, setIsCorrect] = useState(false);

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
              chances={chances}
              disabled={chances === 0 || isCorrect}
              correct={() => {
                correct();
                setIsCorrect(true);
              }}
              key={choice}
              answer={question.answer}
              choice={choice}
              deductChance={() => setChances((prev) => prev - 1)}
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
  deductChance,
  disabled,
  chances,
}: {
  choice: string;
  answer: string;
  correct: () => void;
  deductChance: () => void;
  disabled: boolean;
  chances: number;
}) {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  return (
    <Button
      disabled={
        (choice !== answer && isCorrect === false) ||
        (choice !== answer && disabled)
      }
      className={`
      border-solid border-[1px] relative disabled:opacity-75
      ${
        chances === 0
          ? choice === answer
            ? "border-green-500"
            : "bg-destructive border-destructive"
          : choice === answer
          ? isCorrect
            ? "bg-green-500 border-green-500"
            : null
          : isCorrect === false && "bg-destructive border-destructive"
      }
      h-full
      `}
      onClick={() => {
        if (disabled) return;
        if (choice === answer) {
          setIsCorrect(true);
          correct();
        } else {
          deductChance();
          setIsCorrect(false);
        }
      }}
      variant={"secondary"}
    >
      <p className="w-full text-wrap ">{choice}</p>
      <div className="absolute top-1/2 translate-x-1/2 translate-y-1/2 left-1/2 ">
        <Confetti
          config={{
            dragFriction: 0.1,
            startVelocity: 20,
            duration: 500,
          }}
          active={isCorrect === true}
        />
      </div>
    </Button>
  );
}
