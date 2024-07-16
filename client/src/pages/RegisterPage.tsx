import { useState } from "react";
import AuthFormLayout from "../components/auth/AuthFormLayout";
import InputField from "../components/auth/InputField";

type FormDataKey = "username" | "email" | "password" | "confirmPassword";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const inputFields: { id: FormDataKey; placeholder: string }[] = [
  { id: "username", placeholder: "username" },
  { id: "email", placeholder: "email" },
  { id: "password", placeholder: "password" },
  { id: "confirmPassword", placeholder: "confirm password" },
];

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <AuthFormLayout
      handleSubmit={handleSubmit}
      title="Employee Management App"
      linkHref="/login"
      linkDescription="Already have an account?"
    >
      {inputFields.map((field) => (
        <InputField
          key={field.id}
          id={field.id}
          placeholder={field.placeholder}
          value={formData[field.id]}
          onChange={handleChange}
        />
      ))}
    </AuthFormLayout>
  );
}
