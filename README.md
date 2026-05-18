# Portfolio V2


A modern, full-stack portfolio built with a monorepo architecture using `pnpm`. It features a React-based frontend built with Vite and Tailwind CSS, a robust Node.js API server, and a fully typed shared codebase leveraging Zod, Drizzle ORM, and OpenAPI.

## Project Structure

This project adopts a structured monorepo approach:

- **`artifacts/portfolio`**: The main frontend React application using Vite, Tailwind CSS, Shadcn UI (Radix UI), Framer Motion, and React Query.
- **`artifacts/api-server`**: The backend Node.js API server.
- **`artifacts/mockup-sandbox`**: An isolated frontend sandbox/playground for mockup previews.
- **`lib/`**: Shared internal packages used across frontend and backend:
  - `api-client-react`: Generated React API client and custom fetch utilities.
  - `api-spec`: OpenAPI specifications.
  - `api-zod`: Shared Zod schemas.
  - `db`: Database configuration and schema definitions using Drizzle ORM.

## Prerequisites

- [Node.js](https://nodejs.org/) (Version 18+ recommended)
- [pnpm](https://pnpm.io/) for package management

## Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Run the frontend application in development mode:**
   ```bash
   cd artifacts/portfolio
   pnpm dev
   ```

3. **Run the backend server:**
   *(Navigate to the `artifacts/api-server` directory and check its README/package.json for specific start commands)*

## Monorepo Scripts (Root)

Run these commands from the root directory:

- `pnpm build`: Performs a typecheck and builds all packages and apps in the monorepo.
- `pnpm typecheck`: Runs strict TypeScript type checking across the library (`lib/`) and artifacts (`artifacts/`) directories.

## Tech Stack Highlights

- **Frontend:** React, Vite, Tailwind CSS, Shadcn UI, Framer Motion, React Query, Wouter.
- **Backend:** Node.js, Drizzle ORM (for DB interaction).
- **Tooling:** pnpm Workspaces, TypeScript, Zod, OpenAPI.
