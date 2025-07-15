"use client";

import { useState } from "react";
import ArrayVisualizer from "@/components/ArrayVisualizer";
import { generateRandomArray } from "@/utils/generateRandomArray";

export default function Home() {
  const [array, setArray] = useState<number[]>(generateRandomArray(30, 5, 100));

  return (
    <main className="flex flex-col items-center justify-start p-4 min-h-screen gap-4">
      <h1 className="text-3xl font-bold">AlgoViz</h1>
      <p className="text-gray-600 mb-4">Sorting Algorithm Visualizer & Analyzer</p>
      <ArrayVisualizer array={array} />
      <button
        onClick={() => setArray(generateRandomArray(30, 5, 100))}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Generate New Array
      </button>
    </main>
  );
}
