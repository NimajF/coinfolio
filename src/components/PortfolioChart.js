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
    "#22d3ee", // cyan-400
    "#a855f7", // purple-500
    "#06b6d4", // cyan-500
    "#3b82f6", // blue-500
    "#8b5cf6", // violet-500
    "#10b981", // emerald-500
    "#f59e0b", // amber-500
    "#ef4444", // red-500
  ];

  if (!portfolio?.coins || portfolio.coins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/30 flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p className="text-slate-400 text-sm">No portfolio data available</p>
        <p className="text-slate-500 text-xs mt-1">Add some coins to see your distribution</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Doughnut
        options={options}
        data={{
          labels: chartLabels,
          datasets: [
            {
              label: "Portfolio %",
              data: chartData,
              backgroundColor: chartColors.slice(0, chartData.length),
              borderColor: "#1a1a2e",
              borderWidth: 3,
              hoverBorderWidth: 4,
              hoverBorderColor: "#2a2a3e",
            },
          ],
        }}
      />
    </div>
  );
}

const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        color: "#e5e7eb", // texto de la leyenda
        font: { size: 12, family: "'Inter', sans-serif", weight: "500" },
        padding: 15,
        usePointStyle: true,
        pointStyle: "circle",
        generateLabels(chart) {
          const { labels, datasets } = chart.data;
          if (labels.length && datasets.length) {
            const meta = chart.getDatasetMeta(0);
            return labels.map((label, i) => {
              const style = meta.controller.getStyle(i);
              return {
                text: `${label} (${datasets[0].data[i]}%)`,
                fillStyle: style.backgroundColor,
                strokeStyle: style.borderColor,
                lineWidth: style.borderWidth,
                pointStyle: "circle",
                hidden: isNaN(datasets[0].data[i]) || meta.data[i].hidden,
                index: i,
              };
            });
          }
          return [];
        },
      },
    },
    tooltip: {
      backgroundColor: "#1a1a2e",
      titleColor: "#e2e8f0",
      bodyColor: "#e2e8f0",
      borderColor: "#3a3a5c",
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        // ← fuerza el color del texto del label del tooltip
        labelTextColor: () => "#e2e8f0",
        // (opcional) color del cuadradito del tooltip
        labelColor: (ctx) => {
          const c = ctx.chart.getDatasetMeta(0).controller.getStyle(ctx.dataIndex);
          return { borderColor: c.borderColor, backgroundColor: c.backgroundColor };
        },
        label: (context) => {
          const label = context.label || "";
          const value = context.raw || 0;
          return ` ${label}: ${value}%`;
        },
      },
    },
  },
  cutout: "60%",
  elements: { arc: { borderWidth: 3, hoverBorderWidth: 4 } },
  interaction: { intersect: false, mode: "index" },
};
