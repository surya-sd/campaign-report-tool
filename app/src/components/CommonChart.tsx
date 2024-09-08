import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  ChartOptions,
  ChartData,
} from "chart.js";
import { chartTypes, useCampaign } from "../context/CampaignContext";
import { useSearchParams } from "next/navigation";

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

interface CommonChartProps {
  data: ChartData;
  options?: ChartOptions;
  onClick?: (event: any, elements: any[]) => void;
  optionsExtra?: ChartOptions;
}

const renderChart = (type: string, data: any, options: any) => {
  switch (type) {
    case "Bar":
      return <Bar data={data} width={550} height={200} options={options} />;
    case "Line":
      return <Line data={data} width={550} height={200} options={options} />;
    case "Pie":
      return <Pie data={data} width={550} height={200} options={options} />;
    default:
      return null;
  }
};

const CommonChart = ({ data, optionsExtra, onClick }: CommonChartProps) => {
  const searchParams = useSearchParams();
  const chartTypeFromUrl = searchParams.get("chartType");
  const { chartType, setChartType } = useCampaign();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Report Chart",
      },
    },
    onClick: (event: any, elements: any[]) => handleOnClick(elements, data.datasets),
    ...optionsExtra,
  };

  const handleOnClick = (elements: any[], datasets: any[]) => {
    if (onClick) {
      onClick(elements, datasets);
    }
  };

  return (
    <div className="w-full h-[90%]">
      <select
        className="bg-white border-2  text-black p-2 rounded-lg w-20"
        name="chartType"
        value={chartTypeFromUrl || chartType}
        onChange={(e) => setChartType(e.target.value)}
        title="Chart Type"
      >
        {Object.keys(chartTypes).map((key) => (
          <option key={key} value={chartTypes[key]}>
            {chartTypes[key]}
          </option>
        ))}
      </select>
      {renderChart(chartTypeFromUrl || chartType, data, options)}
    </div>
  );
};

export default CommonChart;
