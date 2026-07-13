import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../services/authService";
import toast from "react-hot-toast";

import AuthLayout from "../../components/layout/AuthLayout";
import Logo from "../../components/ui/Logo";
import Card from "../../components/ui/Card";
import InputField from "../../components/ui/InputField";
import PasswordField from "../../components/ui/PasswordField";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SelectField from "../../components/ui/SelectField";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    phone2: "",
    address: "",
    shop_name: "",
    shop_address: "",
    license_number: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.full_name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim() ||
      !formData.role
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (formData.role === "shopkeeper") {
      if (
        !formData.shop_name.trim() ||
        !formData.shop_address.trim() ||
        !formData.license_number.trim()
      ) {
        toast.error("Please complete all shop details.");
        return;
      }
    }

    try {
      const response = await registerUser({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        phone2: formData.phone2,
        address: formData.address,
        shop_name: formData.shop_name,
        shop_address: formData.shop_address,
        license_number: formData.license_number,
        password: formData.password,
        role: formData.role,
      });

      toast.success(response.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <AuthLayout>
      <Logo />

      <Card>
        <h2 className="text-2xl font-bold text-center text-slate-800">
          Create Account
        </h2>

        <p className="text-center text-slate-500 mt-2 mb-8">
          Register to use ForexFlow
        </p>

        <form onSubmit={handleSubmit}>

          <InputField
            label="Full Name"
            type="text"
            name="full_name"
            placeholder="Enter your full name"
            value={formData.full_name}
            onChange={handleChange}
          />

          <InputField
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <InputField
            label="Phone Number"
            type="text"
            name="phone"
            placeholder="98XXXXXXXX"
            value={formData.phone}
            onChange={handleChange}
          />

          <InputField
            label="Address"
            type="text"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
          />

          <SelectField
            label="Register As"
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={[
              { value: "", label: "Select Role" },
              { value: "customer", label: "Customer" },
              { value: "shopkeeper", label: "Shop" },
            ]}
          />

          {formData.role === "shopkeeper" && (
            <>
              <InputField
                label="Shop Name"
                type="text"
                name="shop_name"
                placeholder="Enter shop name"
                value={formData.shop_name}
                onChange={handleChange}
              />

              <InputField
                label="Shop Address"
                type="text"
                name="shop_address"
                placeholder="Enter shop address"
                value={formData.shop_address}
                onChange={handleChange}
              />

              <InputField
                label="License Number"
                type="text"
                name="license_number"
                placeholder="Enter license number"
                value={formData.license_number}
                onChange={handleChange}
              />

              <InputField
                label="Alternate Phone (Optional)"
                type="text"
                name="phone2"
                placeholder="98XXXXXXXX"
                value={formData.phone2}
                onChange={handleChange}
              />
            </>
          )}

          <PasswordField
            label="Password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
          />

          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <PrimaryButton
            text="Create Account"
            type="submit"
          />

        </form>

        <p className="text-center text-slate-600 mt-6">
          Already have an account?

          <Link
            to="/login"
            className="ml-2 font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Login
          </Link>
        </p>

      </Card>
    </AuthLayout>
  );
}

export default Register;