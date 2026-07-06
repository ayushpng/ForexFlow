import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthLayout from "../../components/layout/AuthLayout";
import Logo from "../../components/ui/Logo";
import Card from "../../components/ui/Card";
import InputField from "../../components/ui/InputField";
import PasswordField from "../../components/ui/PasswordField";
import PrimaryButton from "../../components/ui/PrimaryButton";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser(formData);

      login(response.data.user, response.data.token);

      toast.success(response.data.message);

      // Redirect based on role
      if (response.data.user.role === "customer") {
        navigate("/customer/dashboard");
      } else if (response.data.user.role === "shopkeeper") {
        navigate("/shop/dashboard");
      } else if (response.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Logo />

      <Card>
        <h2 className="text-2xl font-bold text-center text-slate-800">
          Welcome Back 👋
        </h2>

        <p className="text-center text-slate-500 mt-2 mb-8">
          Sign in to continue to your account.
        </p>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <PasswordField
            label="Password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" className="accent-emerald-700" />
              Remember Me
            </label>

            <button
              type="button"
              className="text-sm text-emerald-700 hover:text-emerald-800"
            >
              Forgot Password?
            </button>
          </div>

          <PrimaryButton
            text={loading ? "Logging in..." : "Login"}
            type="submit"
          />
        </form>

        <p className="text-center text-slate-600 mt-6">
          Don't have an account?
          <Link
            to="/register"
            className="ml-2 font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Register
          </Link>
        </p>
      </Card>

      <p className="text-center text-slate-500 text-sm mt-6">
        Trusted Currency Exchange Management Platform
        <br />© 2026 ForexFlow
      </p>
    </AuthLayout>
  );
}

export default Login;
