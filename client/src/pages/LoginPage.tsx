import { useState } from "react";
import AuthFormLayout from "../components/auth/AuthFormLayout";
import InputField from "../components/auth/InputField";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);
  }

  const inputFields = [
    { id: "username", placeholder: "username", value: formData.username },
    { id: "password", placeholder: "password", value: formData.password },
  ];

  return (
    <AuthFormLayout
      handleSubmit={handleSubmit}
      title="Employee Management App"
      linkHref="/register"
      linkDescription="Don't have an account?"
    >
      {inputFields.map((field) => (
        <InputField key={field.id} id={field.id} placeholder={field.placeholder} value={field.value} onChange={handleChange} />
      ))}
    </AuthFormLayout>
  );
}
