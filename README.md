# Projeto de Sistema de Login e Dashboard

Este projeto é uma aplicação de gerenciamento de contatos com autenticação e dashboard. A aplicação possui uma página de login, um dashboard para visualizar contatos e uma página de detalhes do contato.

## Estrutura do Projeto

- **LoginPage**: Página de login com autenticação básica.
- **DashboardPage**: Página principal após o login, onde os contatos são listados.
- **ContactDetailsPage**: Página de detalhes do contato selecionado.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface de usuário.
- **Next.js**: Framework para aplicações React com renderização do lado do servidor.
- **Tailwind CSS**: Framework CSS para estilização.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **JSONPlaceholder**: API de dados falsos usada para fins de demonstração.

## Instalação

Siga os passos abaixo para instalar e executar o projeto localmente:

1. Clone o repositório:

   ```bash
   git clone https://github.com/usuario/projeto.git
   cd projeto
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Abra o navegador e vá para [http://localhost:3000](http://localhost:3000) para visualizar a aplicação.

## Páginas e Funcionalidades

### Página de Login

- **URL**: `/`
- **Funcionalidade**: Permite que o usuário faça login com um nome de usuário e senha.
- **Autenticação**: Usa o armazenamento local para verificar se o usuário está autenticado e redirecionar para o dashboard se já estiver autenticado.

### Página do Dashboard

- **URL**: `/dashboard`
- **Funcionalidade**: Lista todos os contatos com nome, e-mail e avatar.
- **Redirecionamento**: Ao clicar em um contato, o usuário é redirecionado para a página de detalhes do contato.

### Página de Detalhes do Contato

- **URL**: `/dashboard/[id]`
- **Funcionalidade**: Exibe detalhes completos do contato selecionado, incluindo nome, e-mail, telefone, website e empresa.

## Testes

Os testes para a aplicação utilizam Jest e Testing Library. Para executar os testes:

    ```bash
    npm run test
    ```

Os testes cobrem:

- **Renderização das páginas de login, dashboard e detalhes do contato.**
- **Funcionalidade de login e redirecionamento.**
- **Listagem e visualização de contatos.**
- **Logout e remoção de autenticação.**
