import React from "react";

type ArrayVisualizerProps = {
    array: number[];
};

export default function ArrayVisualizer({ array }: ArrayVisualizerProps) {
    return (
        <div className="flex items-end justify-center gap-1 w-full h-64 border border-gray-300 p-2">
            {array.map((value, index) => (
                <div
                    key={index}
                    className="bg-blue-500"
                    style={{
                        width: "10px",
                        height: `${value * 2}px`, // Scale height
                    }}
                />
            ))}
        </div>
    );
}
