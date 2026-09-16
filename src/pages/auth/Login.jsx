import AuthLayout from "../../components/auth/AuthLayout";

function Login() {
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
        <div className="mb-6">
          <h1
            className="
text-3xl
font-extrabold
"
          >
            Welcome back,
            <br />
            Fleet Owner
          </h1>

          <p
            className="
text-sm
text-slate-500
mt-2
"
          >
            Sign in to manage trips, vehicles and earnings.
          </p>
        </div>

        <div className="space-y-4">
          <input
            placeholder="Mobile Number or Email"
            className="
w-full
h-12
rounded-xl
border
px-4
outline-none
"
          />

          <input
            type="password"
            placeholder="Password"
            className="
w-full
h-12
rounded-xl
border
px-4
outline-none
"
          />

          <button
            className="
w-full
h-12
rounded-xl
bg-[#2147c6]
text-white
font-bold
"
          >
            Sign In to Fleet Command →
          </button>
        </div>

        <div
          className="
mt-5
rounded-xl
bg-blue-50
p-3
text-center
text-sm
text-blue-700
"
        >
          🔒 256-bit SSL Banking Grade
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;
