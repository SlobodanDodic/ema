import { ApolloError, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthFormLayout from "../components/auth/AuthFormLayout";
import InputField from "../components/auth/InputField";
import { LOGIN_USER } from "../graphql/auth";
import { useAuth } from "../hooks/useAuth";
import Loading from "./Loading";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const authContext = useAuth();

  const { setLoggedUser, setToken, loggedUser } = authContext;
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
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

      setLoggedUser(response?.data?.signin.user.username);
      setToken(response?.data?.signin.accessToken);
      toast.success("Welcome!");
    } catch (err) {
      const error = err as ApolloError;
      console.error("Error logging in:", error);
      const errorMessage =
        error.graphQLErrors[0]?.message === "Bad Request Exception"
          ? "Login failed! Check your password"
          : error.graphQLErrors[0]?.message;
      toast.error(errorMessage);
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

  if (loading) return <Loading />;

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
    </AuthFormLayout>
  );
}
