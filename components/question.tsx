"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import Confetti from "react-dom-confetti";

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
              disabled={chances === 0}
              correct={() => correct()}
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
}: {
  choice: string;
  answer: string;
  correct: () => void;
  deductChance: () => void;
  disabled: boolean;
}) {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  return (
    <Button
      disabled={isCorrect === false || disabled}
      className={`
      border-solid border-[1px] relative
      ${
        choice === answer
          ? isCorrect
            ? "bg-green-500 border-green-500"
            : null
          : isCorrect === false && "bg-destructive border-destructive"
      }
      h-full
      `}
      onClick={() => {
        if (disabled) return;
        deductChance();
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
      <div className="">
        <Confetti
          config={{
            dragFriction: 0.1,
            startVelocity: 20,
          }}
          active={isCorrect === true}
        />
      </div>
    </Button>
  );
}
