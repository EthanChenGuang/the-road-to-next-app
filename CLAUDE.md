# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint checks
- `npm run lint:fix` - Run ESLint and automatically fix issues
- `npm run format` - Format code with Prettier

## Project Structure

This is a Next.js 15 application using the App Router architecture with the following key structure:

- `src/app/` - App Router pages and layouts
  - `layout.tsx` - Root layout with Geist fonts
  - `page.tsx` - Home page with link to tickets
  - `tickets/` - Tickets section
    - `page.tsx` - Tickets listing page
    - `[ticketId]/page.tsx` - Individual ticket page with dynamic routing

## Technology Stack

- **Framework**: Next.js 15.4.2 with App Router
- **React**: 19.1.0
- **TypeScript**: Full TypeScript setup
- **Styling**: Tailwind CSS v4
- **Fonts**: Geist Sans and Geist Mono from next/font/google
- **Package Manager**: pnpm (specified in packageManager field)

## Code Quality Tools

- **ESLint**: Next.js config with simple-import-sort plugin for import organization
- **Prettier**: Configured with single quotes, semicolons, 2-space tabs
- **TypeScript**: Strict mode enabled with path mapping (`@/*` → `./src/*`)

## Key Development Notes

- Uses Turbopack for fast development builds
- Import sorting is enforced via eslint-plugin-simple-import-sort
- Path aliasing configured for cleaner imports (`@/` points to `src/`)
- Tailwind CSS v4 with PostCSS integration
- Uses React 19 concurrent features