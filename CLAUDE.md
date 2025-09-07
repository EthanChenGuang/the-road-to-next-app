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
- `npm run prisma:migrate` - Run database migrations in development
- `npm run postinstall` - Generate Prisma client (runs automatically after install)

## Project Structure

This is a Next.js 15 application using the App Router architecture with the following key structure:

- `src/app/` - App Router pages and layouts
  - `layout.tsx` - Root layout with navigation sidebar and header
  - `page.tsx` - Home page with link to tickets
  - `(authenticated)/` - Route group with authentication protection
    - `layout.tsx` - Authentication boundary using Lucia Auth
    - `account/` - User account management pages with profile and password sections
    - `tickets/` - Tickets section with error boundaries and loading states
      - `page.tsx` - Tickets listing page with search, sort, and pagination
      - `[ticketId]/` - Dynamic ticket routes with edit functionality
      - `error.tsx` - Error boundary for tickets section
  - `_navigation/` - Shared navigation components (header and sidebar)
  - `api/tickets/` - API routes for ticket operations

- `src/features/` - Feature-based organization
  - `auth/` - Authentication functionality with Lucia Auth
    - `actions/` - Server actions for sign-in, sign-up, sign-out
    - `components/` - Authentication forms
    - `queries/` - Auth state queries and protection
    - `utils/` - Auth utilities like ownership checking
  - `ticket/` - Ticket-related functionality
    - `actions/` - Server actions for CRUD operations
    - `components/` - React components for tickets with search and sorting
    - `queries/` - Database query functions
    - `search-params.tsx` - URL search params parsing with nuqs
    - `constants.tsx` - Ticket-related constants

- `src/components/` - Shared UI components
  - `ui/` - Shadcn/ui components (buttons, forms, dialogs, etc.)
  - `form/` - Form utilities and components with action state management
  - `theme/` - Theme provider and switcher components

- `src/lib/` - Shared utilities and configurations
  - `prisma.ts` - Prisma client configuration with singleton pattern
  - `lucia.ts` - Lucia Auth configuration
  - `utils.ts` - General utility functions

- `prisma/` - Database schema and migrations
  - `schema.prisma` - Database schema with User, Session, and Ticket models
  - `seed.ts` - Database seeding script

## Technology Stack

- **Framework**: Next.js 15.4.2 with App Router
- **React**: 19.1.0
- **TypeScript**: Full TypeScript setup
- **Authentication**: Lucia Auth v3 with Argon2 password hashing
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS v4 + Shadcn/ui components
- **UI Components**: Radix UI primitives, Lucide React icons
- **Forms**: Server actions with Zod validation
- **URL State**: nuqs for search params management with debounced search
- **Error Handling**: react-error-boundary
- **Theming**: next-themes for dark/light mode
- **Notifications**: Sonner for toast notifications
- **Date Handling**: date-fns and react-day-picker
- **Utilities**: Big.js for decimal calculations, fastest-levenshtein for fuzzy search
- **Package Manager**: pnpm (specified in packageManager field)

## Database Architecture

- **Prisma Schema**: Located in `prisma/schema.prisma`
- **Generated Client**: Uses default location (`node_modules/@prisma/client`)
- **Models**:
  - `User` - User accounts with username, email, password hash, and relations to sessions and tickets
  - `Session` - Lucia Auth sessions with expiration and user relation
  - `Ticket` - Main entity with id, title, content, status (OPEN/IN_PROGRESS/DONE), deadline, bounty, timestamps, and user ownership
- **Connection**: Uses singleton pattern in `src/lib/prisma.ts` to prevent connection issues in development

## Code Quality Tools

- **ESLint**: Next.js config with simple-import-sort plugin for import organization
- **Prettier**: Configured with single quotes, semicolons, 2-space tabs
- **TypeScript**: Strict mode enabled with path mapping (`@/*` → `./src/*`)
- **Shadcn/ui**: Component library configured with New York style, CSS variables, Slate base color

## Architecture Patterns

- **Feature-based Organization**: Code organized by domain (auth, tickets) rather than technical layers
- **Route Groups**: `(authenticated)` group with layout-based authentication protection
- **Server Components**: Leverages Next.js App Router's server components for data fetching
- **Server Actions**: Form handling with server actions and progressive enhancement
- **Error Boundaries**: Implemented at route level for graceful error handling
- **Loading States**: Dedicated loading.tsx files for better UX
- **Database Queries**: Separated into dedicated query files for reusability
- **Authentication**: Session-based auth with Lucia Auth and route protection
- **URL State Management**: Search, sorting, and pagination state persisted in URL with nuqs
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

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
- The database schema is defined in @prisma/schema.prisma. Reference it anytime it needs to understand the structure of the data stored in the database