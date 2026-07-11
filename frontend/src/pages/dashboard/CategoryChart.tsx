import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useFetchAdminStatsQuery } from "../../redux/features/stats/statsApi";

const CategoryChart = () => {
  const { data, isLoading } = useFetchAdminStatsQuery({}) as any;

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  const chartData =
    data?.categoryData?.map((item: any) => ({
      category: item._id,
      books: item.count,
    })) || [];

  return (
    <div className="p-4 h-full">
      <h2 className="text-lg font-semibold text-center mb-3">
        Book Categories
      </h2>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 15, left: 15, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis type="number" allowDecimals={false} />

          <YAxis
            dataKey="category"
            type="category"
            width={70}
          />

          <Tooltip />

          <Bar
            dataKey="books"
            fill="#8B5CF6"
            radius={[0, 6, 6, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;