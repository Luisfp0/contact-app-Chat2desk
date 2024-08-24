import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ContactDetailsPage from '@/app/dashboard/[id]/page';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import '@testing-library/jest-dom';

// Mock da função useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

// Mock do hook useAuth
jest.mock('@/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

// Mock do componente Loading
jest.mock('@/components/Loading', () => () => <div>Carregando...</div>);

// Criação da classe mock para Response
class MockResponse implements Response {
  body: ReadableStream<any> | null = null;
  bodyUsed: boolean = false;
  headers: Headers = new Headers();
  ok: boolean = true;
  redirected: boolean = false;
  status: number = 200;
  statusText: string = '';
  type: ResponseType = 'basic';
  url: string = '';

  constructor(public jsonBody: any) {}

  async json() {
    return this.jsonBody;
  }

  async text() {
    return JSON.stringify(this.jsonBody);
  }

  async blob() {
    return new Blob([JSON.stringify(this.jsonBody)]);
  }

  async formData() {
    return new FormData();
  }

  async arrayBuffer() {
    const encoder = new TextEncoder();
    return encoder.encode(JSON.stringify(this.jsonBody)).buffer;
  }

  clone() {
    return new MockResponse(this.jsonBody);
  }
}

// Mock da API com atraso
global.fetch = jest.fn(() =>
  new Promise((resolve) =>
    setTimeout(() => resolve(new MockResponse({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      website: 'johndoe.com',
      company: {
        name: 'John Doe Inc.',
        catchPhrase: 'We do things',
      },
    })), 500)
  )
);

describe('ContactDetailsPage', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
  });

  it('should display loading initially', async () => {
    render(<ContactDetailsPage />);

    // Verifica se o texto "Carregando..." está presente no DOM
    await waitFor(() => {
      expect(screen.getByText('Carregando...')).toBeInTheDocument();
    });
  });

  it('should display contact details after fetching', async () => {
    render(<ContactDetailsPage />);

    // Espera a renderização dos dados do contato
    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());

    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('johndoe.com')).toBeInTheDocument();
    expect(screen.getByText('John Doe Inc.')).toBeInTheDocument();
    expect(screen.getByText('We do things')).toBeInTheDocument();
  });
});
