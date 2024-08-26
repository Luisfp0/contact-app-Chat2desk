import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent, act } from "@testing-library/react";
import DashboardPage from "@/app/dashboard/page";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth"; // Adicione a importação para useAuth

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

// Simule o hook useAuth
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    loading: false,
  }),
}));

const mockContacts = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
  },
];

describe("DashboardPage", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve(
            mockContacts.map((contact) => ({
              id: contact.id,
              name: contact.name,
              email: contact.email,
              avatarUrl: `https://i.pravatar.cc/150?img=${contact.id}`,
            }))
          ),
      })
    ) as jest.Mock;
  });

  test("renders contact list", async () => {
    await act(async () => {
      render(<DashboardPage />);
    });

    await waitFor(() => {
      mockContacts.forEach((contact) => {
        expect(screen.getByText(contact.name)).toBeInTheDocument();
        expect(screen.getByText(contact.email)).toBeInTheDocument();
      });
    });
  });

  test("clicking on a contact redirects to contact details page", async () => {
    await act(async () => {
      render(<DashboardPage />);
    });

    await waitFor(() => {
      expect(screen.getByText(mockContacts[0].name)).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByText(mockContacts[0].name));
    });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith(`/dashboard/${mockContacts[0].id}`);
    });
  });

  test("clicking on logout redirects to login and removes auth", async () => {
    await act(async () => {
      render(<DashboardPage />);
    });

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "Logout" }));
    });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith(`/`);
    });

    expect(localStorage.getItem("isAuthenticated")).toBeNull();
  });
});
