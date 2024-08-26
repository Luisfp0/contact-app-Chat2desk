import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "@/app/page";
import { useRouter } from "next/navigation";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders login page", () => {
    render(<LoginPage />);

    expect(
      screen.getByText("Entre com seus dados de acesso.")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Nome de usuário:")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
  });

  test("logs in with correct credentials and redirects to dashboard", async () => {
    render(<LoginPage />);

    // Preenche o formulário de login
    fireEvent.change(screen.getByLabelText("Nome de usuário:"), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText("Senha:"), {
      target: { value: "password" },
    });

    // Submete o formulário
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    // Verifica se o redirecionamento ocorreu
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/dashboard");
    });

    // Verifica se o status de autenticação foi salvo no localStorage
    expect(localStorage.getItem("isAuthenticated")).toBe("true");
  });

  test("shows error message for invalid credentials", async () => {
    // Mock para o método de alerta para não exibir no teste
    jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<LoginPage />);

    // Preenche o formulário com credenciais inválidas
    fireEvent.change(screen.getByLabelText("Nome de usuário:"), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText("Senha:"), {
      target: { value: "wrongpassword" },
    });

    // Submete o formulário
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    // Verifica se o status de autenticação não foi salvo no localStorage
    expect(localStorage.getItem("isAuthenticated")).toBeNull();
  });
});
