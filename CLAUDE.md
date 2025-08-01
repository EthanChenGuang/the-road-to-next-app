# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint checks
- `npm run lint:fix` - Run ESLint and automatically fix issues
- `npm run typecheck` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run prisma:seed` - Seed the database with initial data
- `npm run postinstall` - Generate Prisma client (runs automatically after install)

## Project Structure

This is a Next.js 15 application using the App Router architecture with the following key structure:

- `src/app/` - App Router pages and layouts
  - `layout.tsx` - Root layout with Geist fonts
  - `page.tsx` - Home page with link to tickets
  - `tickets/` - Tickets section with error boundaries and loading states
    - `page.tsx` - Tickets listing page
    - `[ticketId]/page.tsx` - Individual ticket page with dynamic routing
    - `error.tsx` - Error boundary for tickets section
    - `loading.tsx` - Loading UI for ticket detail pages
    - `not-found.tsx` - 404 page for invalid ticket IDs

- `src/features/` - Feature-based organization
  - `ticket/` - Ticket-related functionality
    - `components/` - React components for tickets
    - `queries/` - Database query functions
    - `constants.tsx` - Ticket-related constants

- `src/lib/` - Shared utilities and configurations
  - `prisma.ts` - Prisma client configuration with singleton pattern

- `prisma/` - Database schema and migrations
  - `schema.prisma` - Database schema with Ticket model
  - `seed.ts` - Database seeding script

## Technology Stack

- **Framework**: Next.js 15.4.2 with App Router
- **React**: 19.1.0
- **TypeScript**: Full TypeScript setup
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS v4 + Shadcn/ui components
- **UI Components**: Radix UI primitives, Lucide React icons
- **Error Handling**: react-error-boundary
- **Theming**: next-themes for dark/light mode
- **Fonts**: Geist Sans and Geist Mono from next/font/google
- **Package Manager**: pnpm (specified in packageManager field)

## Database Architecture

- **Prisma Schema**: Located in `prisma/schema.prisma`
- **Generated Client**: Uses default location (`node_modules/@prisma/client`)
- **Models**:
  - `Ticket` - Main entity with id, title, content, status (OPEN/IN_PROGRESS/DONE), timestamps
- **Connection**: Uses singleton pattern in `src/lib/prisma.ts` to prevent connection issues in development

## Code Quality Tools

- **ESLint**: Next.js config with simple-import-sort plugin for import organization
- **Prettier**: Configured with single quotes, semicolons, 2-space tabs
- **TypeScript**: Strict mode enabled with path mapping (`@/*` → `./src/*`)
- **Shadcn/ui**: Component library configured with New York style, CSS variables, Slate base color

## Architecture Patterns

- **Feature-based Organization**: Code organized by domain (tickets) rather than technical layers
- **Server Components**: Leverages Next.js App Router's server components for data fetching
- **Error Boundaries**: Implemented at route level for graceful error handling
- **Loading States**: Dedicated loading.tsx files for better UX
- **Database Queries**: Separated into dedicated query files for reusability
- **Type Safety**: Full end-to-end TypeScript with Prisma-generated types

## Key Development Notes

- Uses Turbopack for fast development builds
- Import sorting is enforced via eslint-plugin-simple-import-sort
- Path aliasing configured for cleaner imports (`@/` points to `src/`)
- Tailwind CSS v4 with PostCSS integration
- Uses React 19 concurrent features
- Database migrations should be handled through Prisma CLI
- Prisma client is automatically generated on postinstall
- Development database uses connection pooling through directUrl
