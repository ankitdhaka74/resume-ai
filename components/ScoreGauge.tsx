"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  score: number;
  title: string;
}

export default function ScoreGauge({ score, title }: Props) {
  const getStatus = (score: number) => {
    if (score >= 80)
      return {
        label: "High",
        color: "text-green-600",
      };

    if (score >= 60)
      return {
        label: "Moderate",
        color: "text-yellow-600",
      };

    return {
      label: "Low",
      color: "text-red-600",
    };
  };

  const status = getStatus(score);

  return (
    <div className="w-44 mx-auto">

      <CircularProgressbar
        value={score}
        text={`${score}%`}
        styles={buildStyles({
          textSize: "18px",

          pathColor:
            score >= 80
              ? "#16a34a"
              : score >= 60
              ? "#f59e0b"
              : "#dc2626",

          textColor: "#111827",
          trailColor: "#e5e7eb",
        })}
      />

      <p className="mt-4 text-center text-lg font-bold">
        {title}
      </p>

      <p
        className={`text-center font-semibold ${status.color}`}
      >
        {status.label}
      </p>

    </div>
  );
}