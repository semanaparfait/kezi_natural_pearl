


import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { useGetAllOrdersQuery } from "@/features/orders/OrderApi";
import { useGetUsersQuery } from "@/features/users/usersApi";
// Removed unused imports to fix TS6133 errors

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// Helper to format date as YYYY-MM-DD
const formatDate = (dateStr: string) => new Date(dateStr).toISOString().slice(0, 10);

function Analytics() {
  // Fetch data
  const { data: orders = [] } = useGetAllOrdersQuery();
  const { data: users = [] } = useGetUsersQuery();
  // Removed unused wishlistData and products to fix TS6133 errors

  // --- Orders Per Day ---
  const ordersByDay: Record<string, number> = {};
  orders.forEach((order: any) => {
    const day = formatDate(order.createdAt);
    ordersByDay[day] = (ordersByDay[day] || 0) + 1;
  });
  const orderDays = Object.keys(ordersByDay).sort();
  const orderCounts = orderDays.map((d) => ordersByDay[d]);

  // --- Users Per Day ---
  const usersByDay: Record<string, number> = {};
  users.forEach((user: any) => {
    const day = formatDate(user.createdAt);
    usersByDay[day] = (usersByDay[day] || 0) + 1;
  });
  const userDays = Object.keys(usersByDay).sort();
  const userCounts = userDays.map((d) => usersByDay[d]);

  // --- Top Bought Products ---
  const productSales: Record<string, { name: string; count: number }> = {};
  orders.forEach((order: any) => {
    if (order.items) {
      order.items.forEach((item: any) => {
        const name = item.product?.name || "Unknown";
        if (!productSales[name]) productSales[name] = { name, count: 0 };
        productSales[name].count += item.quantity;
      });
    }
  });
  const topBought = Object.values(productSales)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);


  // --- Top Customers (users who bought the most items) ---
  const customerTotals: Record<string, { name: string; count: number }> = {};
  orders.forEach((order: any) => {
    const user = order.user;
    const userId = user?.userId || order.userId || order.guestId || "Guest";
    const name = user?.fullName || user?.email || order.shippingAddressSnapshot?.fullName || "Guest";
    let totalItems = 0;
    if (order.items) {
      order.items.forEach((item: any) => {
        totalItems += item.quantity;
      });
    }
    if (!customerTotals[userId]) customerTotals[userId] = { name, count: 0 };
    customerTotals[userId].count += totalItems;
  });
  const topCustomers = Object.values(customerTotals)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // --- Chart Data ---
  const ordersPerDayData = {
    labels: orderDays,
    datasets: [
      {
        label: "Orders per Day",
        data: orderCounts,
        backgroundColor: "#6366F1",
        borderRadius: 8,
      },
    ],
  };

  const usersPerDayData = {
    labels: userDays,
    datasets: [
      {
        label: "Users per Day",
        data: userCounts,
        backgroundColor: "#22C55E",
        borderRadius: 8,
      },
    ],
  };

  const topBoughtData = {
    labels: topBought.map((p) => p.name),
    datasets: [
      {
        label: "Top Bought Products",
        data: topBought.map((p) => p.count),
        backgroundColor: ["#F59E42", "#F43F5E", "#6366F1", "#22C55E", "#FBBF24"],
      },
    ],
  };


  const topCustomersData = {
    labels: topCustomers.map((c) => c.name),
    datasets: [
      {
        label: "Top Customers (by items bought)",
        data: topCustomers.map((c) => c.count),
        backgroundColor: ["#F59E42", "#F43F5E", "#6366F1", "#22C55E", "#FBBF24"],
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-(--primary)">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Orders Per Day</h2>
          <Bar data={ordersPerDayData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Users Per Day</h2>
          <Bar data={usersPerDayData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white rounded-2xl p-6 shadow flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Top Bought Products</h2>
          <Pie data={topBoughtData} options={{ responsive: true }} />
        </div>
        <div className="bg-white rounded-2xl p-6 shadow flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Top Customers</h2>
          <Pie data={topCustomersData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
}

export default Analytics;