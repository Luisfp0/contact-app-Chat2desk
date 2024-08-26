"use client";
import React from 'react';
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
    <div className="p-4 sm:p-8 text-black">
      <button
        onClick={() => router.push("/dashboard")}
        className="flex items-center text-blue-500 underline mb-4 hover:text-blue-700 no-underline"
      >
        <FaArrowLeft className="mr-2" />
        Voltar
      </button>
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center">
        <img
          src={`https://i.pravatar.cc/150?img=${contact.id}`}
          alt={`${contact.name}'s avatar`}
          className="w-24 h-24 sm:w-30 sm:h-30 rounded-full mr-0 sm:mr-6 mb-4 sm:mb-0"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{contact.name}</h1>
          <p className="text-sm sm:text-lg mb-1 sm:mb-2">
            <strong>Email:</strong> {contact.email}
          </p>
          <p className="text-sm sm:text-lg mb-1 sm:mb-2">
            <strong>Telefone:</strong> {contact.phone}
          </p>
          <p className="text-sm sm:text-lg mb-1 sm:mb-2">
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
          <p className="text-sm sm:text-lg mb-1 sm:mb-2">
            <strong>Empresa:</strong> {contact.company.name}
          </p>
          <p className="text-sm sm:text-lg">
            <strong>Slogan:</strong> {contact.company.catchPhrase}
          </p>
        </div>
      </div>
    </div>
  );
}
