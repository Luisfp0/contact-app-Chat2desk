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
    console.log(`Clicked on contact with id: ${id}`);
    router.push(`/dashboard/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Contatos</h1>
      <div className="flex flex-wrap -mx-2">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex w-full sm:w-1/2 lg:w-1/3 p-2"
            onClick={() => handleContactClick(contact.id)}
          >
            <div className="flex items-center p-4 bg-white shadow rounded-lg w-full cursor-pointer">
              <img
                src={contact.avatarUrl}
                alt={`${contact.name}'s avatar`}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div className="overflow-hidden">
                <h2 className="text-xl font-semibold text-black">
                  {contact.name}
                </h2>
                <p className="text-gray-500 truncate">{contact.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
