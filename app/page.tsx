"use client";

import { useEffect, useState } from "react";
import ArrayVisualizer from "@/components/ArrayVisualizer";
import { generateRandomArray } from "@/utils/generateRandomArray";
import { bubbleSortSteps } from "@/utils/bubbleSortSteps";

export default function Home() {
  const [array, setArray] = useState<number[]>(generateRandomArray(30, 5, 100));
  const [steps, setSteps] = useState<number[][]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying && steps.length > 0 && currentStep < steps.length - 1) {
      const id = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(id);
            setIsPlaying(false);
            return prev;
          }
        });
      }, 200); // speed (ms)

      setIntervalId(id);

      return () => clearInterval(id); // cleanup
    }

    if (!isPlaying && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [isPlaying, steps, currentStep]);




  return (
    <main className="flex flex-col items-center justify-start p-4 min-h-screen gap-4">
      <h1 className="text-3xl font-bold">AlgoViz</h1>
      <p className="text-gray-600 mb-4">Sorting Algorithm Visualizer & Analyzer</p>
      <ArrayVisualizer array={steps.length > 0 ? steps[currentStep] : array} />

      {steps.length > 0 && (
        <p className="text-sm text-gray-600 mt-2">
          Iteration: <strong>{currentStep + 1}</strong>
        </p>
      )}


      {steps.length > 0 && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() =>
              setCurrentStep((prev) => Math.max(0, prev - 1))
            }
            className="px-3 py-1 bg-gray-400 text-white rounded"
          >
            Prev
          </button>
          <button
            onClick={() =>
              setCurrentStep((prev) =>
                Math.min(steps.length - 1, prev + 1)
              )
            }
            className="px-3 py-1 bg-gray-600 text-white rounded"
          >
            Next
          </button>
        </div>
      )}

      <button
        onClick={() => {
          setIsPlaying(false);
          setSteps([]);
          setCurrentStep(0);
          setArray(generateRandomArray(30, 5, 100));
        }}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Generate New Array
      </button>

      {array.length > 0 && (
        <button
          onClick={() => {
            if (steps.length === 0) {
              const recordedSteps = bubbleSortSteps(array);
              setSteps(recordedSteps);
              setCurrentStep(0);
              setIsPlaying(true);
            } else {
              setIsPlaying((prev) => !prev);
            }
          }}
          className={`px-4 py-2 rounded text-white ${isPlaying ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {steps.length === 0
            ? "Start Bubble Sort"
            : isPlaying
              ? "Pause"
              : "Resume"}
        </button>
      )}



    </main>
  );
}
