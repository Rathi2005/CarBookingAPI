import { Car, FileText, MessageSquare, Shield } from "lucide-react";

function AuthLayout({ children }) {
  return (
    <div
      className="
      min-h-screen
      bg-[#f6f8fc]
      flex
      items-center
      justify-center
      p-6
      "
    >
      <div
        className="
        w-full
        max-w-6xl
        grid
        lg:grid-cols-2
        gap-8
        items-center
        "
      >
        {/* LEFT BRAND PANEL */}

        <div
          className="
          bg-gradient-to-br
          from-[#2147c6]
          to-[#19379f]
          rounded-3xl
          p-8
          text-white
          shadow-xl
          min-h-[650px]
          flex
          flex-col
          justify-between
          "
        >
          <div>
            <div
              className="
              flex
              items-center
              gap-3
              mb-8
              "
            >
              <div
                className="
                bg-white
                text-blue-700
                rounded-xl
                p-3
                "
              >
                <Car size={28} />
              </div>

              <div>
                <h2 className="font-extrabold text-xl">DRIVE OWNER</h2>

                <p className="text-sm text-blue-100">
                  Mission-Critical Fleet Suite
                </p>
              </div>
            </div>

            <h1
              className="
              text-4xl
              font-black
              leading-tight
              "
            >
              Manage your cars.
              <br />
              Manage your trips.
              <br />
              <span className="text-cyan-300">Know your business.</span>
            </h1>

            <p
              className="
              mt-5
              text-blue-100
              "
            >
              Built specifically for transport fleet operators, running local,
              outstation and corporate car trips across India.
            </p>

            <div className="space-y-4 mt-8">
              <Feature
                icon={<FileText />}
                title="Instant Trip & Odometer Audits"
                text="Capture trip details and settlements"
              />

              <Feature
                icon={<MessageSquare />}
                title="WhatsApp & SMS Invoicing"
                text="Dispatch bills after parking"
              />

              <Feature
                icon={<Shield />}
                title="Driver Data & Fuel Ledger"
                text="Track expenses and earnings"
              />
            </div>
          </div>

          <div>
            <div
              className="
              bg-white/10
              rounded-2xl
              p-5
              "
            >
              <p className="italic text-lg">
                "Reduced my fleet work by 2 hours daily"
              </p>

              <p className="mt-3 text-blue-100">
                Rohit Sharma
                <br />
                Fleet Owner
              </p>
            </div>

            <div
              className="
              grid
              grid-cols-3
              gap-3
              mt-6
              "
            >
              <Stat value="₹2.4L+" label="Tracked/mo" />

              <Stat value="99.8%" label="SLA uptime" />

              <Stat value="<10s" label="Trip Log" />
            </div>
          </div>
        </div>

        {/* RIGHT LOGIN / REGISTER */}

        <div>{children}</div>
      </div>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div
      className="
flex
gap-4
items-center
bg-white/10
rounded-xl
p-4
"
    >
      <div>{icon}</div>

      <div>
        <p className="font-bold">{title}</p>

        <p className="text-sm text-blue-100">{text}</p>
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
p-4
text-center
"
    >
      <p className="font-bold text-xl">{value}</p>

      <p className="text-xs text-blue-100">{label}</p>
    </div>
  );
}

export default AuthLayout;
