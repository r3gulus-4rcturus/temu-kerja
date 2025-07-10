import { getOrdersForUser, getJobsByProvider, getPendingApplicationsForProvider} from "../../lib/actions/fetchPropsForDashboard";
import DashboardClient from "../../components/dashboard/DashboardClient";
import { getCurrentUser } from "../../lib/auth";
import { get } from "http";


export default async function DashboardPage() {
  // Fetch the orders on the server
  const orders = await getOrdersForUser();
  const user = await getCurrentUser();
  const jobs = await getJobsByProvider(user.id);
  const applications = await getPendingApplicationsForProvider(user.id);

  console.log(orders)

  // Pass the server-fetched data to the client component
  return <DashboardClient
    orders={orders}
    jobs={jobs}
    username={user?.username || ""}
    userId={user?.id || ""}
    applications = {applications}
  />;
}