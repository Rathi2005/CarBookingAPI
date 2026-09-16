import AuthLayout from "../../components/auth/AuthLayout";

function Register() {
  return (
    <AuthLayout>
      <div
        className="
bg-white
rounded-3xl
border
border-slate-200
shadow-lg
p-8
"
      >
        {/* Header */}

        <div
          className="
mb-6
"
        >
          <h1
            className="
text-3xl
font-extrabold
text-slate-950
"
          >
            Create Owner Account
          </h1>

          <p
            className="
mt-2
text-sm
text-slate-500
"
          >
            Start managing your fleet operations today.
          </p>
        </div>

        {/* Form */}

        <div
          className="
space-y-4
"
        >
          <div>
            <label
              className="
text-sm
font-bold
text-slate-700
"
            >
              Owner Name
            </label>

            <input
              placeholder="Enter your name"
              className="
mt-2
w-full
h-12
rounded-xl
border
border-slate-200
px-4
outline-none
focus:border-blue-500
"
            />
          </div>

          <div>
            <label
              className="
text-sm
font-bold
text-slate-700
"
            >
              Mobile Number
            </label>

            <input
              placeholder="Enter mobile number"
              className="
mt-2
w-full
h-12
rounded-xl
border
border-slate-200
px-4
outline-none
focus:border-blue-500
"
            />
          </div>

          <div>
            <label
              className="
text-sm
font-bold
text-slate-700
"
            >
              Email Address
            </label>

            <input
              placeholder="owner@example.com"
              className="
mt-2
w-full
h-12
rounded-xl
border
border-slate-200
px-4
outline-none
focus:border-blue-500
"
            />
          </div>

          <div
            className="
grid
md:grid-cols-2
gap-4
"
          >
            <div>
              <label
                className="
text-sm
font-bold
text-slate-700
"
              >
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="
mt-2
w-full
h-12
rounded-xl
border
border-slate-200
px-4
outline-none
focus:border-blue-500
"
              />
            </div>

            <div>
              <label
                className="
text-sm
font-bold
text-slate-700
"
              >
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="
mt-2
w-full
h-12
rounded-xl
border
border-slate-200
px-4
outline-none
focus:border-blue-500
"
              />
            </div>
          </div>

          <button
            className="
mt-3
w-full
h-12
rounded-xl
bg-[#2147c6]
text-white
font-bold
hover:bg-[#193dad]
transition
"
          >
            Create Fleet Account →
          </button>
        </div>

        {/* Security */}

        <div
          className="
mt-5
grid
grid-cols-2
gap-3
"
        >
          <div
            className="
rounded-xl
bg-blue-50
p-3
text-center
text-xs
font-bold
text-blue-700
"
          >
            🔒 Secure JWT Auth
          </div>

          <div
            className="
rounded-xl
bg-emerald-50
p-3
text-center
text-xs
font-bold
text-emerald-700
"
          >
            ⚡ Instant Setup
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Register;
