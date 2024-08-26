"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = () => {
      const isAuthenticated =
        localStorage.getItem("isAuthenticated") === "true";
      if (isAuthenticated) {
        router.push("/dashboard");
      }
    };

    checkAuthentication();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setFormError("");
    setUsernameError(false);
    setPasswordError(false);

    let hasError = false;

    if (username.trim() === "") {
      setFormError((prev) => prev + "Nome de usuário é obrigatório. ");
      setUsernameError(true);
      hasError = true;
    }

    if (password.trim() === "") {
      setFormError((prev) => prev + "Senha é obrigatória. ");
      setPasswordError(true);
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    if (username === "admin" && password === "password") {
      console.log("Logged");
      localStorage.setItem("isAuthenticated", "true");
      router.push("/dashboard");
    } else {
      setFormError("Credenciais inválidas. Por favor, tente novamente.");
    }

    setLoading(false);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (usernameError) {
      setUsernameError(false);
      setFormError((prev) => prev.replace("Nome de usuário é obrigatório. ", ""));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) {
      setPasswordError(false);
      setFormError((prev) => prev.replace("Senha é obrigatória. ", ""));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col md:flex-row w-full h-full">
        <div className="flex flex-col items-center justify-center w-full md:w-4/5 bg-blue-500 text-white p-8">
          <div className="text-center">
            <Image
              src="/images/chat2desk_brasil_logo.jpeg"
              width={96}
              height={96}
              className="rounded-lg mx-auto"
              alt="logo"
              priority
            />
            <h1 className="mt-4 text-4xl font-bold text-[#283CFA]">
              Chat<span className="text-[#55DBAB]">2</span>Desk
            </h1>
            <h3 className="mt-2 text-xl">CRM OmniChannel</h3>
          </div>
        </div>

        <div className="flex items-center justify-center w-full md:w-3/5 p-8">
          <div className="flex flex-col w-full max-w-sm text-black">
            <h1 className="mb-8 text-lg font-semibold text-center md:text-left">
              Entre com seus dados de acesso.
            </h1>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col mb-4">
                <label htmlFor="username" className="mb-2">
                  Nome de usuário:
                </label>
                <input
                  id="username"
                  type="text"
                  className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    usernameError
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="flex flex-col mb-6">
                <label htmlFor="password" className="mb-2">
                  Senha:
                </label>
                <input
                  id="password"
                  type="password"
                  className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    passwordError
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <button
                className="w-full px-3 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                type="submit"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
              <p></p>
              {formError ? (
                <div className="h-4">
                  <p className="text-red-500 text-sm mt-4 text-center">
                    {formError}
                  </p>
                </div>
              ) : (
                <div className="h-8">
                </div>
              )}
            </form>
            <span className="mt-4 text-blue-500 underline cursor-pointer text-center md:text-left">
              Esqueci minha senha
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
