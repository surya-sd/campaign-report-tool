import React, { useRef } from "react";
import { useDrag } from "react-dnd";

const Metric = ({ metric }) => {
  const dragRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "METRIC",
    item: { metric },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  drag(dragRef);
  return (
    <div
      ref={dragRef}
      className={`p-2 bg-slate-200 mr-2 md:ml-0 mb-2 rounded cursor-move capitalize ${
        isDragging ? "opacity-30" : "opacity-100"
      }`}
    >
      {metric}
    </div>
  );
};

export default Metric;
