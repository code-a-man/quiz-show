"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { useState, useEffect } from "react";

type Question = {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer?: string;
};

type Answer = {
  id: number;
  answer: string;
};

const SessionPage = ({ params }: { params: { uuid: string } }) => {
  const [questions, setQuestions] = useState<Question[]>([]) as [
    Question[],
    React.Dispatch<React.SetStateAction<Question[]>>
  ];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0) as [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ];
  const [answers, setAnswers] = useState<Answer[]>([]) as [
    Answer[],
    React.Dispatch<React.SetStateAction<Answer[]>>
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://localhost:3000/api/get-quiz`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Session-Id": params.uuid,
          },
        });
        const questions = await response.json();
        setQuestions(questions.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [params.uuid]);

  const handleAnswerClick = async (answer: string) => {
    if (currentQuestionIndex >= questions.length) {
      return;
    }
    // if question answered return

    if (
      answers.some((answer) => answer.id === questions[currentQuestionIndex].id)
    ) {
      return;
    }

    const newAnswers = [
      ...answers,
      { id: questions[currentQuestionIndex].id, answer: answer },
    ];
    setAnswers(newAnswers);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      try {
        await fetch(`https://localhost:3000/api/submit-quiz`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uuid: params.uuid, newAnswers }),
        });
        alert("All questions answered and submitted!");
      } catch (error) {
        console.error("Error submitting answers:", error);
      }
    }
  };

  if (questions?.length === 0) {
    return <div>Loading...</div>;
  }

  if (currentQuestionIndex >= questions?.length) {
    return <div>All questions answered!</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Card className="w-full max-w-md p-8">
        <h1>Question {currentQuestionIndex + 1}</h1>
        <h2 className="text-xl font-semibold">
          {questions[currentQuestionIndex].questionText}
        </h2>
        <ul className="flex flex-col gap-2">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <li key={index} className="flex items-center gap-2 w-full">
              <Button
                key={index}
                onClick={() => handleAnswerClick(option)}
                variant="outline"
                size="sm"
                id={`${index}`}
                className="w-full border border-sky-300"
              >
                {option}
              </Button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default SessionPage;
