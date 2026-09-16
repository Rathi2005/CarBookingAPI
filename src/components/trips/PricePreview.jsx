const PricePreview = ({ distance, pricePerKm }) => {
  const amount = Number(distance || 0) * Number(pricePerKm || 0);

  return (
    <div
      className="
rounded-2xl
border
shadow-sm
p-5
bg-white
"
    >
      <p className="text-gray-500">Estimated Fare</p>

      <h2
        className="
text-3xl
font-bold
mt-2
"
      >
        ₹{amount}
      </h2>

      <p className="text-sm text-gray-500 mt-2">
        {distance || 0} km × ₹{pricePerKm || 0}/km
      </p>
    </div>
  );
};

export default PricePreview;
