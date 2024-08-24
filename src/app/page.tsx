"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import logo from "../../public/chat2desk_brasil_logo.jpeg";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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

    if (username === "admin" && password === "password") {
      console.log("Logged");
      localStorage.setItem("isAuthenticated", "true");
      router.push("/dashboard");
    } else {
      alert("Credenciais inválidas. Por favor, tente novamente.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex w-full h-full">
        <div className="flex flex-col items-center justify-center w-2/5 bg-blue-500 text-white">
          <div>
            <Image
              src="/images/chat2desk_brasil_logo.jpeg"
              width={96}
              height={96}
              className="rounded-lg"
              alt="logo"
            />
            <h1 className="mt-4 text-4xl font-bold text-[#283CFA]">
              Chat<span className="text-[#55DBAB]">2</span>Desk
            </h1>
            <h3 className="mt-2 text-xl">CRM OmniChannel</h3>
          </div>
        </div>

        <div className="flex items-center justify-center w-3/5">
          <div className="flex flex-col w-80 text-black">
            <h1 className="mb-8 text-lg font-semibold">
              Entre com seus dados de acesso.
            </h1>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col mb-4">
                <label htmlFor="username" className="mb-2">
                  Nome de usuário ou e-mail:
                </label>
                <input
                  id="username"
                  type="text"
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col mb-6">
                <label htmlFor="password" className="mb-2">
                  Senha:
                </label>
                <input
                  id="password"
                  type="password"
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="w-full px-3 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                type="submit"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </form>
            <span className="mt-4 text-blue-500 underline cursor-pointer">
              Esqueci minha senha
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
