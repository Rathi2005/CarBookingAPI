import { Download } from "lucide-react";

function ReportHeader() {
  return (
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
      <div
        className="
flex
flex-col
gap-4
lg:flex-row
lg:items-center
lg:justify-between
"
      >
        <div>
          <p
            className="
text-xs
font-bold
uppercase
tracking-wide
text-blue-600
"
          >
            Business Analytics
          </p>

          <h1
            className="
mt-2
text-3xl
font-extrabold
text-slate-950
"
          >
            Reports & Analytics
          </h1>

          <p
            className="
mt-2
text-sm
text-slate-500
"
          >
            Track earnings, trips and fleet performance.
          </p>
        </div>

        <button
          className="
h-11
px-5
rounded-xl
border
border-slate-200
bg-white
flex
items-center
justify-center
gap-2
text-sm
font-bold
text-slate-700
hover:bg-slate-50
"
        >
          <Download size={17} />
          Export Report
        </button>
      </div>
    </section>
  );
}

export default ReportHeader;
