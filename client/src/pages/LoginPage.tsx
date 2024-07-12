import { useState } from "react";
import Inputs from "../components/login/Inputs";
// import SvgLogo from "../components/svg/SvgLogo";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        {/* <SvgLogo /> */}
        <img src="/logo.png" alt="logo" className="absolute z-10 w-11 left-2 bottom-5" />

        <div className="absolute inset-0 transform -skew-y-6 shadow-lg bg-gradient-to-r from-amber-300 to-amber-600 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <h1 className="z-20">Employee Management App</h1>

            <form onSubmit={handleSubmit} className="py-8 space-y-4 leading-6 text-stone-700">
              <Inputs inputName="email" value={formData.email} onChange={handleChange} />
              <Inputs inputName="password" value={formData.password} onChange={handleChange} />

              <div className="relative pt-2">
                <button type="submit" className="w-full px-2 py-1 text-white rounded bg-amber-500">
                  Submit
                </button>
              </div>

              <div className="pt-2 text-sm text-center">
                <a href="#">Forgot password?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
