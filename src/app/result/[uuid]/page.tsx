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
      setTimeText(
        dayjs(time * 1000)
          .tz("Europe/Istanbul")
          .fromNow()
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <Card>
      <h1>Result</h1>
      <p>Score: {score}</p>
      <p>
        Time: {timeText} (
        {dayjs(time * 1000)
          .tz("Europe/Istanbul")
          .format("HH:mm:ss")}
        )
      </p>
    </Card>
  );
};

export default ResultPage;
