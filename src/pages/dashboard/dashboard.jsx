import DashboardHeader from "../../components/dashboard/DashboardHeader";
import FleetTelemetry from "../../components/dashboard/FleetTelemetry";
import DashboardStats from "../../components/dashboard/DashboardStats";
import RecentTrips from "../../components/dashboard/RecentTrips";
import TripEstimator from "../../components/dashboard/TripEstimator";
import LiveMap from "../../components/dashboard/LiveMap";
import FleetInsights from "../../components/dashboard/FleetInsights";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import { useDashboard } from "../../hooks/useDashboard";

function Dashboard() {
  const dashboard = useDashboard();

  const stats = dashboard?.stats;
  const trips = dashboard?.trips;

  if (!stats || !trips) {
    return <LoadingSpinner />;
  }

  if (stats.isLoading || trips.isLoading) {
    return <LoadingSpinner />;
  }

  if (stats.isError || trips.isError) {
    return (
      <div className="p-6">
        <p className="text-red-500">Unable to load dashboard data.</p>
      </div>
    );
  }

  const dashboardStats = stats.data ?? {};
  const recentTrips = Array.isArray(trips.data)
    ? trips.data
    : (trips.data?.data ?? []);

  return (
    <div className="space-y-6">
      <DashboardHeader />

      <FleetTelemetry data={dashboardStats} />

      <DashboardStats data={dashboardStats} />

      <section className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <RecentTrips trips={recentTrips} />

        <TripEstimator />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <LiveMap />

        <FleetInsights />
      </section>
    </div>
  );
}

export default Dashboard;
