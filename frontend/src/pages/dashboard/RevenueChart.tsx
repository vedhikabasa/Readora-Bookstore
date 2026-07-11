import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { useFetchAdminStatsQuery } from "../../redux/features/stats/statsApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlySale {
  _id: string;
  totalSales: number;
  totalOrders: number;
}

const RevenueChart = () => {
  const { data, isLoading } = useFetchAdminStatsQuery({});

  if (isLoading) {
    return <div className="p-5">Loading Chart...</div>;
  }

  const monthlySales: MonthlySale[] = data?.monthlySales || [];

  const labels = monthlySales.map((item) => {
    const date = new Date(item._id + "-01");
    return date.toLocaleString("default", {
      month: "short",
    });
  });

  const revenue = monthlySales.map((item) => item.totalSales);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue (USD)",
        data: revenue,
        backgroundColor: "rgba(34,197,94,0.7)",
        borderColor: "rgba(34,197,94,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Revenue",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full p-4 bg-white shadow rounded-lg">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RevenueChart;