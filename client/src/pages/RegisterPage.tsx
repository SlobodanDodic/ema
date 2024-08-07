import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthFormLayout from "../components/auth/AuthFormLayout";
import InputField from "../components/auth/InputField";
import { REGISTER_USER } from "../graphql/auth";
import Loading from "./Loading";

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

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [registerUser, { loading }] = useMutation(REGISTER_USER);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const validateForm = (data: FormData) => {
    const errors: Partial<FormData> = {};

    if (!data.username.trim()) {
      errors.username = "Username is required";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 7 || data.password.length > 14) {
      errors.password = "Password has to be between 7 and 14 chars";
    }

    if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await registerUser({
          variables: {
            input: {
              username: formData.username,
              email: formData.email,
              password: formData.password,
            },
          },
        });

        console.log("User registered:", response.data.signup);
        toast.success("Successfully registered! Please wait for activation and then log in... 👀");
        navigate("/login");
      } catch (err) {
        console.error("Error registering user:", err);
        toast.error("Registration failed. Please try again with a different username or email.");
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <AuthFormLayout
      handleSubmit={handleSubmit}
      title="Employee Management App"
      linkHref="/login"
      linkDescription="Already have an account?"
    >
      {inputFields.map((field) => (
        <div key={field.id}>
          <InputField id={field.id} placeholder={field.placeholder} value={formData[field.id]} onChange={handleChange} />
          {errors[field.id] && <span className="text-xs font-semibold text-red-500">{errors[field.id]}</span>}
        </div>
      ))}
    </AuthFormLayout>
  );
}
