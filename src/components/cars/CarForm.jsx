import InputField from "../common/InputField";

function CarForm({
  formData,
  onChange,
  onSubmit,
  loading,
  onCancel,
}) {

  return (
    <form onSubmit={onSubmit} className="space-y-5">

      <InputField
        label="Brand"
        name="brand"
        value={formData.brand}
        onChange={onChange}
        placeholder="Toyota"
      />


      <InputField
        label="Model"
        name="model"
        value={formData.model}
        onChange={onChange}
        placeholder="Innova Crysta"
      />


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        <InputField
          label="Manufacturing Year"
          name="year"
          type="number"
          value={formData.year}
          onChange={onChange}
          placeholder="2025"
        />


        <InputField
          label="Price Per KM"
          name="pricePerKm"
          type="number"
          value={formData.pricePerKm}
          onChange={onChange}
          placeholder="18"
        />

      </div>



      <div className="flex gap-4 pt-4">


        <button
          type="button"
          onClick={onCancel}
          className="
          flex-1
          h-11
          rounded-xl
          border
          border-slate-200
          text-sm
          font-bold
          text-slate-600
          hover:bg-slate-50
          "
        >

          Cancel

        </button>



        <button
          disabled={loading}
          className="
          flex-1
          h-11
          rounded-xl
          bg-[#2147c6]
          text-white
          text-sm
          font-bold
          disabled:bg-blue-300
          "
        >

          {
            loading
            ? "Saving..."
            : "Save Vehicle"
          }

        </button>


      </div>


    </form>
  );
}


export default CarForm;