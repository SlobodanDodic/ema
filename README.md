# Employee Management Application

This application is designed for managing employee data and their associated details. It uses a range of modern web technologies to provide a seamless user experience.

## Technologies Used

- **Infrastructure:**

  - Docker

- **Client Side:**

  - ReactJS with Vite JS bundler
  - TypeScript
  - React Router 6.4
  - Tailwind CSS

- **Server Side:**
  - NestJS
  - Prisma
  - GraphQL
  - PostgreSQL 16 DB

## Deployment

- **Docker Containers:**
  - **Client Container**: Hosts the React application, ensuring that all dependencies are aligned with the development environment.
  - **Server Container**: Contains the NestJS application along with Prisma and GraphQL setup, interfacing with a PostgreSQL database container.
- **Docker Compose**:
  - Use Docker Compose to manage the multi-container setup (client, server, database) with a single command, enhancing configuration and operation simplicity.

## Starting the Application

### On `branch pg_admin_4`

**\*Note:** Not finished, because I've decided to use Docker\*

#### Client Side

1. Navigate to the `client` directory.
2. Run the Vite development server using the command: `npm run dev`.

#### Server Side

1. Navigate to the `server` directory.
2. Start the NestJS development server using the command: `npm run start:dev`.
3. Open Prisma Studio using the command: `npx prisma studio`.

### On `branch main`

#### Root

1. Navigate to the `root` directory.
2. Start the Docker Compose development environment using the command: `docker compose up --build`.
3. Open Prisma Studio using the command: `npm run prisma-studio`.

## Features

### Login & Registration

- **User Registration & Login Flow:**
  - Users fill out and submit the sign-up form with their email and password.
  - Users await approval from an administrator.
  - Administrators review and activate the user's account.
  - Approved users can log in.
  - Users can reset their password if forgotten (feature pending implementation).

### Employee Management

- **Employee Entry Form:**

  - Users submit the employee form with necessary details.
  - Details are saved to the database.

- **Employee Details Page:**
  - Users can view, edit, and delete employee information.
  - Updates are reflected in the database.

### Health Care And Fitpass Management

- **Health Care And Fitpass Members Flow:**
  - Users submit forms for health care and fitpass members.
  - Member details are saved to the database.
