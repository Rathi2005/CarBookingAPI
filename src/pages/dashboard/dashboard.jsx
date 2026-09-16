import DashboardHeader from "../../components/dashboard/DashboardHeader";
import FleetTelemetry from "../../components/dashboard/FleetTelemetry";
import DashboardStats from "../../components/dashboard/DashboardStats";
import RecentTrips from "../../components/dashboard/RecentTrips";
import TripEstimator from "../../components/dashboard/TripEstimator";
import LiveMap from "../../components/dashboard/LiveMap";
import FleetInsights from "../../components/dashboard/FleetInsights";

function Dashboard() {
  return (
    <div className="space-y-6">
      <DashboardHeader />

      <FleetTelemetry />

      <DashboardStats />

      <section
        className="
grid
gap-6
xl:grid-cols-[1fr_380px]
"
      >
        <RecentTrips />

        <TripEstimator />
      </section>

      <section
        className="
grid
gap-6
lg:grid-cols-[1.5fr_1fr]
"
      >
        <LiveMap />

        <FleetInsights />
      </section>
    </div>
  );
}

export default Dashboard;
