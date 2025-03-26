import { Chart, ArcElement, LinearScale, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, LinearScale, Tooltip, Legend);
import { Doughnut } from "react-chartjs-2";

export default function PortfolioChart({ portfolio }) {
  const chartLabels =
    portfolio?.coins?.map((c) => c.symbol.toUpperCase()) || [];
  const chartData =
    portfolio?.coins?.map((c) =>
      ((c.totalCoinInversion / portfolio.totalInvestment) * 100).toFixed(2)
    ) || [];
  const chartColors = [
    "#46e57b",
    "#6563f1",
    "#c381f8",
    "#fca5f0",
    "#c7c8fe",
    "#e0fff2",
  ];
  return (
    <Doughnut
      options={options}
      data={{
        labels: chartLabels,
        datasets: [
          {
            label: "Portfolio Percentage",
            data: chartData,
            backgroundColor: chartColors.slice(0, chartData.length),
            borderColor: "rgb(30 41 59)",
            borderWidth: 1,
          },
        ],
      }}
    />
  );
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "right",
      labels: {
        color: "rgb(255, 255, 255)",
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.label}: ${context.raw}%`,
      },
    },
  },
};
