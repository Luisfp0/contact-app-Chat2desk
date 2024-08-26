"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import Loading from "@/components/Loading";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
  };
}

export default function ContactDetailsPage() {
  useAuth();
  const [contact, setContact] = useState<Contact | null>(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchContact = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      const data = await response.json();
      setContact(data);
    };

    fetchContact();
  }, [id]);

  if (!contact) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center text-blue-500 hover:text-blue-700 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Voltar
        </button>
        <div className="flex flex-col sm:flex-row items-center">
          <img
            src={`https://i.pravatar.cc/150?img=${contact.id}`}
            alt={`${contact.name}'s avatar`}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-4 sm:mb-0 sm:mr-6"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{contact.name}</h1>
            <p className="text-lg text-gray-600 mb-2">
              <strong>Email:</strong> {contact.email}
            </p>
            <p className="text-lg text-gray-600 mb-2">
              <strong>Telefone:</strong> {contact.phone}
            </p>
            <p className="text-lg text-gray-600 mb-2">
              <strong>Website:</strong>{" "}
              <a
                href={`http://${contact.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {contact.website}
              </a>
            </p>
            <p className="text-lg text-gray-600 mb-2">
              <strong>Empresa:</strong> {contact.company.name}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Slogan:</strong> {contact.company.catchPhrase}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
