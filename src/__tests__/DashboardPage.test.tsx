import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import DashboardPage from "@/app/dashboard/page";
import { useRouter } from "next/navigation";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
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
    render(<DashboardPage />);

    await waitFor(() => {
      mockContacts.forEach((contact) => {
        expect(screen.getByText(contact.name)).toBeInTheDocument();
        expect(screen.getByText(contact.email)).toBeInTheDocument();
      });
    });
  });

  test("clicking on a contact redirects to contact details page", async () => {
    render(<DashboardPage />);

    // Aguarda até que os contatos estejam visíveis
    await waitFor(() => {
      expect(screen.getByText(mockContacts[0].name)).toBeInTheDocument();
    });

    // Simula o clique
    fireEvent.click(screen.getByText(mockContacts[0].name));

    // Verifica se a função `push` foi chamada
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith(`/dashboard/${mockContacts[0].id}`);
    });
  });
});
