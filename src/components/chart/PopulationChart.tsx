import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Country } from "../../services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PopulationChartProps {
  countries: Country[];
}

type MetricType = "population" | "area";

const CHART_COLORS = {
  backgroundColor: "rgba(53, 162, 235, 0.5)",
  borderColor: "rgb(53, 162, 235)",
  borderWidth: 1,
};

export default function PopulationChart({ countries }: PopulationChartProps) {
  const [metric, setMetric] = useState<MetricType>("population");

  const sortedCountries = [...countries]
    .sort((a, b) => (metric === "population" ? b.population - a.population : b.area - a.area))
    .slice(0, 10);

  const formatNumber = (value: number) => {
    if (metric === "population") {
      if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
      if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
      return value.toLocaleString();
    }
    
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M km²`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(2)}K km²`;
    return `${value.toLocaleString()} km²`;
  };

  const chartData: ChartData<"bar"> = {
    labels: sortedCountries.map((country) => country.name.common),
    datasets: [
      {
        label: metric === "population" ? "Population" : "Area (km²)",
        data: sortedCountries.map((country) => 
          metric === "population" ? country.population : country.area
        ),
        ...CHART_COLORS,
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: `Top 10 Countries by ${metric === "population" ? "Population" : "Area"}`,
        font: { size: 16 },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (typeof context.parsed.y === "number") {
              return `${context.dataset.label}: ${formatNumber(context.parsed.y)}`;
            }
            return "";
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => typeof value === "number" ? formatNumber(value) : value,
        },
      },
    },
  };

  return (
    <div className="flex-1 h-fit mb-8 p-4 bg-white rounded-lg shadow border border-gray-200">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700">
          Country Statistics
        </h2>
        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value as MetricType)}
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="population">Population</option>
          <option value="area">Area</option>
        </select>
      </div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
