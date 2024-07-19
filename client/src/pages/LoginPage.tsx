import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import AuthFormLayout from "../components/auth/AuthFormLayout";
import InputField from "../components/auth/InputField";
import { LOGIN_USER } from "../components/graphql";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const authContext = useAuth();

  const { setLoggedUser, setToken, loggedUser } = authContext;
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await loginUser({
        variables: {
          input: {
            username: formData.username,
            password: formData.password,
          },
        },
      });

      if (response && response.data && response.data.signin) {
        setLoggedUser(response.data.signin.user.username);
        setToken(response.data.signin.accessToken);
      } else {
        console.error("Login response is invalid:", response.data.signup);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  useEffect(() => {
    if (loggedUser) {
      navigate("/", { replace: true });
    }
  }, [loggedUser, navigate]);

  const inputFields = [
    { id: "username", placeholder: "username", name: "username", value: formData.username },
    { id: "password", placeholder: "password", name: "password", value: formData.password },
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
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </AuthFormLayout>
  );
}
