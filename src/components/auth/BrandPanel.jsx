import { Car, ShieldCheck, MessageSquare, FileText } from "lucide-react";

function BrandPanel() {
  return (
    <div
      className="
rounded-3xl
bg-gradient-to-br
from-[#2147c6]
to-[#102a8a]
p-8
text-white
shadow-xl
"
    >
      <div
        className="
flex
items-center
gap-3
"
      >
        <div
          className="
h-12
w-12
rounded-xl
bg-white
text-blue-700
flex
items-center
justify-center
"
        >
          <Car size={25} />
        </div>

        <div>
          <h1 className="font-extrabold text-xl">DRIVEOWNER</h1>

          <p className="text-xs opacity-80">MISSION-CRITICAL FLEET SUITE</p>
        </div>
      </div>

      <h2
        className="
mt-8
text-3xl
font-extrabold
leading-tight
"
      >
        Manage your cars.
        <br />
        Manage your trips.
        <br />
        <span className="text-emerald-300">Know your business.</span>
      </h2>

      <p
        className="
mt-4
text-sm
text-blue-100
"
      >
        Built specifically for transport fleet operators, running local,
        outstation and corporate trips.
      </p>

      <div className="mt-8 space-y-4">
        <Feature
          icon={FileText}
          title="Instant Trip & Odometer Audits"
          text="Capture trip details and settlements"
        />

        <Feature
          icon={MessageSquare}
          title="WhatsApp & SMS Invoicing"
          text="Dispatch bills after parking"
        />

        <Feature
          icon={ShieldCheck}
          title="Driver Data & Fuel Ledger"
          text="Track expenses and earnings"
        />
      </div>

      <div
        className="
mt-8
rounded-2xl
bg-white/10
p-5
"
      >
        <p className="text-sm italic">
          "Reduced my fleet work by 2 hours daily"
        </p>

        <p
          className="
mt-3
text-xs
text-blue-200
"
        >
          Rohit Sharma
          <br />
          Fleet Owner
        </p>
      </div>

      <div
        className="
mt-8
grid
grid-cols-3
gap-3
"
      >
        <Stat value="₹2.4L+" label="Tracked/mo" />

        <Stat value="99.8%" label="SLA uptime" />

        <Stat value="<10s" label="Trip Log" />
      </div>
    </div>
  );
}

function Feature({ icon: Icon, title, text }) {
  return (
    <div
      className="
flex
gap-3
bg-white/10
rounded-xl
p-3
"
    >
      <Icon size={20} />

      <div>
        <p className="font-bold text-sm">{title}</p>

        <p className="text-xs text-blue-100">{text}</p>
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div
      className="
bg-white/10
rounded-xl
p-3
text-center
"
    >
      <p className="font-extrabold">{value}</p>

      <p className="text-xs">{label}</p>
    </div>
  );
}

export default BrandPanel;
