import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";

import { authService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      const response = await authService.login(formData);

      console.log("LOGIN RESPONSE", response.data);

      const token = response.data.token;

      login(token);

      navigate("/dashboard");
    } catch (err) {
      console.log("LOGIN ERROR", err);

      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

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

        {error && (
          <div
            className="
bg-red-50
text-red-600
p-3
rounded-xl
mb-4
"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            value={formData.password}
            onChange={handleChange}
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
            type="submit"
            disabled={loading}
            className="
w-full
h-12
rounded-xl
bg-[#2147c6]
text-white
font-bold
disabled:opacity-50
"
          >
            {loading ? "Signing in..." : "Sign In to Fleet Command →"}
          </button>
        </form>

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
