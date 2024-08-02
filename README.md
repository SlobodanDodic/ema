# Employee Management Application

This application is designed for managing employee data and their associated details. It uses a range of modern web technologies to provide a seamless user experience.

## Technologies Used

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

## Starting the Application on `branch pg_admin_4`

### Client Side

To start the client-side application:

1. Navigate to the `client` directory.
2. Run the Vite development server using command: `npm run dev`,

## Server Side

To start the server-side application:

1. Navigate to the `server` directory.
2. Start the NestJS development server using command: `npm run start:dev`,
3. Open Prisma Studio using command: `npx prisma studio`,

## Starting the Application on `branch main`

### Root

To start the the whole application:

1. Navigate to the `root` directory.
2. Start the Docker Compose development server using command: `docker compose up --build`,
3. Open Prisma Studio using command: `npm run prisma-studio`,

## Login & Registration Page

The application includes functionality for user registration and login:

### User Registration & Login Flow

1. Users fill out and submit the sign-up form with their email and password.
2. After submission, the user awaits approval from an administrator.
3. The administrator reviews and approves the user by activating their account and sending a notification.
4. Once approved, the user can log in to the application.
5. Users will also have the option to reset their password if forgotten (this feature is not yet implemented).

## Employee Entry Form

The application includes functionality for adding, editing, and deleting employees:

### Employee Entry Form Flow

1. Users fill out and submit the employee entry form with their details.
2. The employee entry form will be submitted to the database.

## Employee Details Page

The application includes functionality for viewing, editing, and deleting employee details:

### Employee Details Page Flow

1. Users can view and edit employee details.
2. The employee details will be updated in the database.

## Health Care And Fitpass Members

The application includes functionality for adding, editing, and deleting health care members:

### Health Care And Fitpass Members Flow

1. Users fill out and submit the health care member form with their details.
2. The health care member form will be submitted to the database.
