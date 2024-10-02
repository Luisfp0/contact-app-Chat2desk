import { Metadata } from "next";
import ContactDetails from "./ContactDetails";

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

async function getContact(id: string): Promise<Contact> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch contact');
  }
  return response.json();
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const contact = await getContact(params.id);

    const title = `${contact.name} - Detalhes do Contato`;
    const description = `Informações de contato para ${contact.name}`;

    const baseUrl = "https://contact-app-chat2desk.vercel.app"

    const imageUrl = `https://i.pravatar.cc/1200?img=${contact.id}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "profile",
        url: `${baseUrl}/dashboard/${params.id}`,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Detalhes do Contato",
      description: "Informações do contato não disponíveis no momento.",
    };
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const contact = await getContact(params.id);
  return <ContactDetails contact={contact} />;
}