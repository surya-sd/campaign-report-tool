"use client";

import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { useCampaign } from "../context/CampaignContext";

const ReportCanvas = () => {
  const { selectedMetrics, setSelectedMetrics, setMetrics } = useCampaign();
  const dropRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "METRIC",
    drop: (item: { metric: string }) => handleMetricDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  drop(dropRef);

  const handleMetricDrop = (item: { metric: string }) => {
    setSelectedMetrics((prev) => [...prev, item.metric]);
    setMetrics((prev) => prev.filter((metric) => metric !== item.metric));
  };

  const handleMetricRemove = (metric: string) => {
    setSelectedMetrics((prev) => prev.filter((m) => m !== metric));
    setMetrics((prev) => [...prev, metric]);
  };

  return (
    <div
      ref={dropRef}
      className={`p-4 flex flex-wrap rounded-md h-auto drop-shadow-md h-20 ${isOver ? "bg-slate-100" : "bg-white"}`}
    >
      {selectedMetrics.length === 0 ? (
        <div className="size-full content-center text-center">
          <p>Drop metrics here</p>
        </div>
      ) : (
        selectedMetrics.map((metric, index) => (
          <div className="text-white p-1 px-2 rounded-md m-1 bg-slate-500 w-fit h-9 drop-shadow-sm capitalize" key={index}>
            {metric}
            <button
              className="cursor-pointer ml-2  row-autorounded-lg text-sm opacity-60 hover:opacity-100"
              onClick={() => handleMetricRemove(metric)}
            >
              x
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ReportCanvas;
