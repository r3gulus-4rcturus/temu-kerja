import { getOrdersForUser } from "../../lib/actions/order.actions";
import { getJobsByProvider } from "../../lib/actions/fetchjob.actions";
import DashboardClient from "../../components/dashboard/DashboardClient";
import { getCurrentUser } from "../../lib/auth";

export default async function DashboardPage() {
  // Fetch the orders on the server
  const orders = await getOrdersForUser();
  const user = await getCurrentUser();
  const jobs = await getJobsByProvider(user.id);

  console.log(orders)

  // Pass the server-fetched data to the client component
  return <DashboardClient orders={orders} jobs={jobs} username={user?.username || ""} userId={user?.id || ""}/>;
}