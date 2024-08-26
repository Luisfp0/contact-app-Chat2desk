"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Loading from "@/components/Loading";
interface Contact {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
}

export default function DashboardPage() {
  useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        const contacts = data.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          avatarUrl: `https://i.pravatar.cc/150?img=${user.id}`,
        }));
        setContacts(contacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleContactClick = (id: number) => {
    router.push(`/dashboard/${id}`);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("isAuthenticated");
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Contatos</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => handleContactClick(contact.id)}
            >
              <img
                src={contact.avatarUrl}
                alt={`${contact.name}'s avatar`}
                className="w-16 h-16 rounded-full mr-4"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {contact.name}
              </h2>
              <p className="text-gray-500">{contact.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
