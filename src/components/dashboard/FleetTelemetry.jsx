function FleetTelemetry({ data = {} }) {
  const telemetry = [
    {
      label: "Cars Available",
      value: data.availableCars ?? 0,
      color: "bg-emerald-50 text-emerald-700",
      dot: "bg-emerald-500",
    },

    {
      label: "On Trip",
      value: data.activeTrips ?? 0,
      color: "bg-blue-50 text-blue-700",
      dot: "bg-blue-500",
    },

    {
      label: "Maintenance",
      value: 0,
      color: "bg-purple-50 text-purple-700",
      dot: "bg-purple-400",
    },
  ];

  return (
    <div
      className="
      rounded-2xl
      border
      border-slate-200
      bg-white
      p-5
      shadow-sm
      "
    >
      <div className="flex items-center gap-6 flex-wrap">
        <h2
          className="
          text-lg
          font-extrabold
          text-slate-900
          "
        >
          Fleet Telemetry
        </h2>

        {telemetry.map((item) => (
          <div
            key={item.label}
            className={`
              flex
              items-center
              gap-2
              rounded-full
              px-4
              py-2
              text-sm
              font-bold
              ${item.color}
            `}
          >
            <span
              className={`
              h-2.5
              w-2.5
              rounded-full
              ${item.dot}
              `}
            />
            {item.value} {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FleetTelemetry;
