function StatusBadge({ status }) {
  const styles = {
    Available: "bg-green-100 text-green-700",

    Unavailable: "bg-gray-100 text-gray-700",

    Maintenance: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`
px-3
py-1
rounded-full
text-sm
font-medium

${styles[status] || "bg-gray-100 text-gray-600"}

`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
