function TripStatusBadge({ status }) {
  const styles = {
    Active: "bg-blue-50 text-blue-700",
    Upcoming: "bg-indigo-50 text-indigo-700",
    Completed: "bg-emerald-50 text-emerald-700",
    Cancelled: "bg-red-50 text-red-600",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-[7px] font-bold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export default TripStatusBadge;