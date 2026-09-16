import ReportHeader from "../../components/reports/ReportHeader";
import RevenueCard from "../../components/reports/RevenueCard";
import ReportStats from "../../components/reports/ReportStats";
import DailyReport from "../../components/reports/DailyReport";
import VehiclePerformance from "../../components/reports/VehiclePerformance";

function Reports() {
  return (
    <div className="space-y-6">
      <ReportHeader />

      <RevenueCard />

      <ReportStats />

      <DailyReport />

      <div
        className="
        grid
        gap-6
        lg:grid-cols-2
        "
      >
        <VehiclePerformance />

        <section
          className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          "
        >
          <h2
            className="
            text-xl
            font-extrabold
            text-slate-900
            "
          >
            Earnings Trend
          </h2>

          <p
            className="
            mt-1
            text-sm
            text-slate-500
            "
          >
            Monthly revenue performance
          </p>

          <div
            className="
            mt-5
            h-64
            rounded-xl
            bg-slate-50
            flex
            items-center
            justify-center
            text-slate-400
            "
          >
            Chart Placeholder
          </div>
        </section>
      </div>
    </div>
  );
}

export default Reports;
