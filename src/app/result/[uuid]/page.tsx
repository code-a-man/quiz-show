"use client";

import { Card } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
//dayjs
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

const ResultPage = ({ params }: { params: { uuid: string } }) => {
  // get result from api

  const [score, setScore] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [timeText, setTimeText] = useState<string>("");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/get-result`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Session-Id": params.uuid,
          },
        });
        const result = await response.json();
        setScore(result.score);
        setTime(result.time);
        console.log("Result:", result);
      } catch (error) {
        console.error("Error fetching result:", error);
      }
    };

    fetchResult();
  }, [params.uuid]);

  // set interval to refresh timetext every second relative to current time

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeText(dayjs(time).tz("Europe/Istanbul").fromNow());
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen sm:p-20 font-semibold font-[family-name:var(--font-geist-sans)]">
      {score ? (
        <Card className="w-full max-w-md p-8 flex flex-col gap-4">
          <h1 className="text-xl">Sonuçlar</h1>
          <p>{params.uuid}</p>
          <p>Skor: {score} / 3</p>
          <p>
            {" "}
            Geçen Zaman: {timeText} (
            {dayjs(time).tz("Europe/Istanbul").format("HH:mm:ss")})
          </p>
          {score === 3 ? (
            <p className="text-green-500">Tebrikler! Kazandınız!</p>
          ) : (
            <p className="text-red-500">Üzgünüz, Kaybettiniz!</p>
          )}
          <a href="/" className="text-blue-500 underline">
            Ana Sayfa
          </a>
        </Card>
      ) : (
        <Card className="w-full max-w-md p-8">
          <h1></h1>
        </Card>
      )}
    </div>
  );
};

export default ResultPage;
