"use client";

import { useEffect, useState } from "react";
import ArrayVisualizer from "@/components/ArrayVisualizer";
import { generateRandomArray } from "@/utils/generateRandomArray";
import { bubbleSortSteps } from "@/utils/bubbleSortSteps";
import { quickSortSteps } from "@/utils/quickSortSteps";
import { mergeSortSteps } from "@/utils/mergeSortSteps";

export default function Home() {
  const [array, setArray] = useState<number[]>(generateRandomArray(30, 5, 100));
  const [steps, setSteps] = useState<number[][]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [sortTime, setSortTime] = useState<number | null>(null);
  const [selectedAlgo, setSelectedAlgo] = useState("bubble");

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
      }, 200); // Animation speed (ms)

      setIntervalId(id);
      return () => clearInterval(id);
    }

    if (!isPlaying && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [isPlaying, steps, currentStep]);

  return (
    <main className="flex flex-col items-center justify-start p-4 min-h-screen gap-6 bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-700">AlgoViz</h1>
      <p className="text-gray-500">Sorting Algorithm Visualizer & Analyzer</p>

      {/* Visualizer */}
      <ArrayVisualizer array={steps.length > 0 ? steps[currentStep] : array} />

      {/* Step info + timing */}
      {steps.length > 0 && (
        <div className="text-center text-sm text-gray-600">
          <p>Iteration: <strong>{currentStep + 1}</strong></p>
          {sortTime !== null && <p>Sort Time: <strong>{sortTime.toFixed(2)}</strong> ms</p>}
        </div>
      )}

      {/* Algorithm selector */}
      <div className="mt-2">
        <label htmlFor="algorithm" className="text-sm text-gray-600 mr-2">
          Choose Algorithm:
        </label>
        <select
          id="algorithm"
          value={selectedAlgo}
          onChange={(e) => setSelectedAlgo(e.target.value)}
          className="px-3 py-2 rounded border border-gray-300 text-sm text-gray-700"
        >
          <option value="bubble">Bubble Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="merge">Merge Sort</option>
        </select>
      </div>

      {/* Control buttons */}
      <div className="flex gap-3 mt-4 flex-wrap justify-center">
        <button
          onClick={() => {
            setIsPlaying(false);
            setSteps([]);
            setCurrentStep(0);
            setSortTime(null);
            setArray(generateRandomArray(30, 5, 100));
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Generate New Array
        </button>

        {array.length > 0 && (
          <button
            onClick={() => {
              if (steps.length === 0) {
                let recordedSteps: number[][] = [];
                const t0 = performance.now();
                if (selectedAlgo === "bubble") {
                  recordedSteps = bubbleSortSteps(array);
                } else if (selectedAlgo === "quick") {
                  recordedSteps = quickSortSteps(array);
                } else if (selectedAlgo === "merge") {
                  recordedSteps = mergeSortSteps(array);
                }
                const t1 = performance.now();

                setSortTime(t1 - t0);
                setSteps(recordedSteps);
                setCurrentStep(0);
                setIsPlaying(true);
              } else {
                setIsPlaying((prev) => !prev);
              }
            }}
            className={`px-4 py-2 rounded text-white ${isPlaying
              ? "bg-yellow-600 hover:bg-yellow-700"
              : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {steps.length === 0
              ? `Start ${selectedAlgo.charAt(0).toUpperCase() + selectedAlgo.slice(1)} Sort`
              : isPlaying
                ? "Pause"
                : "Resume"}
          </button>
        )}
      </div>
    </main>
  );
}
