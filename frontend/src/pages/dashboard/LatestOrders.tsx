import { useFetchAdminStatsQuery } from "../../redux/features/stats/statsApi";

interface LatestOrder {
  _id: string;
  name: string;
  email: string;
  totalPrice: number;
  createdAt: string;
}

const LatestOrders = () => {
  const { data, isLoading } = useFetchAdminStatsQuery({});

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  const orders: LatestOrder[] = data?.latestOrders || [];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-5">Latest Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders available.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition"
            >
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="font-semibold">{order.name}</h3>

                  <p className="text-sm text-gray-500">
                    {order.email}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-green-600 font-bold text-right">
                  ${order.totalPrice}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestOrders;