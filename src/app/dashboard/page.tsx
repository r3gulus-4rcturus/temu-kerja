import {
   getOrdersForUser, 
   getJobsByProvider, 
   getJobApplicationsForProvider,
   getApplicantsForProvider
  } from "../../lib/actions/fetchPropsForDashboard";
import { getWorkers } from "../../lib/actions/worker.actions";  
import DashboardClient from "../../components/dashboard/DashboardClient";
import { getCurrentUser } from "../../lib/auth";

export default async function DashboardPage() {
  // Fetch the orders on the server
  const orders = await getOrdersForUser();
  const user = await getCurrentUser();
  const jobs = await getJobsByProvider(user.id);
  const applications = await getJobApplicationsForProvider();
  const applicants = await getApplicantsForProvider();
  const workers = await getWorkers();

  // console.log(orders)

  // Pass the server-fetched data to the client component
  return <DashboardClient
    orders={orders}
    jobs={jobs}
    username={user?.username || ""}
    userId={user?.id || ""}
    applications = {applications}
    applicants = {applicants}
    workers = {workers}
  />;
}