# Chas Advance Backend

This is the backend for the Chas Advance project, built with Node.js, Express, and TypeScript. It provides RESTful APIs for user authentication, package management, and user management.

## Table of Contents
- [Project Overview](#project-overview)
- [Folder Structure](#folder-structure)
- [NPM Packages Used](#npm-packages-used)
- [How to Run](#how-to-run)
- [API Endpoints](#api-endpoints)

---

## Project Overview
This backend serves as the main API for the Chas Advance platform. It handles:
- User registration and login with JWT authentication
- CRUD operations for packages
- CRUD operations for users

The backend is written in TypeScript for improved developer experience and reliability.

## Folder Structure
```
chas-advance-backend/
├── src/
│   ├── controllers/         # (Reserved for controller logic, if needed)
│   ├── middlewares/         # Custom Express middlewares (e.g., async handler, authentication)
│   ├── routes/              # Express route modules (login, packages, user)
│   ├── types/               # TypeScript type definitions
│   └── index.ts             # Main entry point
├── package.json             # Project metadata and scripts
├── tsconfig.json            # TypeScript configuration
└── readme.txt               # Project documentation
```

## NPM Packages Used

### Dependencies
- **express**: The core web framework for building REST APIs.
- **bcryptjs**: For hashing and verifying user passwords securely.
- **jsonwebtoken**: For creating and verifying JWT tokens for authentication.
- **ts-node**: Runs TypeScript files directly, used for local development.

### Dev Dependencies
- **@types/express**: TypeScript type definitions for Express.
- **@types/jsonwebtoken**: TypeScript type definitions for jsonwebtoken.

## How We Use These Packages
- **express** is used to create the main API server and define routes for authentication, packages, and users.
- **bcryptjs** is used in the registration and login flows to hash passwords and check password validity.
- **jsonwebtoken** is used to generate JWT tokens on login/registration and to authenticate requests using middleware.
- **ts-node** allows us to run TypeScript code directly in development, so you can use `npm start` without compiling first.
- **Type definitions** help ensure type safety throughout the codebase.

## How to Run
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm start
   ```
   This will run the backend on [http://localhost:3000](http://localhost:3000) by default.

## API Endpoints

### Auth
- `POST /login/register` — Register a new user
- `POST /login/login` — User login

### Packages
- `GET /packages/` — List all packages
- `GET /packages/:id` — Get a package by ID
- `POST /packages/` — Create a new package
- `PUT /packages/:id` — Update a package
- `DELETE /packages/:id` — Delete a package

### Users
- `GET /user/` — List all users
- `GET /user/:id` — Get a user by ID
- `POST /user/` — Create a new user
- `PUT /user/:id` — Update a user
- `DELETE /user/:id` — Delete a user

---

## Notes
- You may need to set environment variables such as `JWT_SECRET` for authentication to work correctly.
- This backend is designed to be extended. Add controllers, services, or database integrations as needed.

---

If you have any questions or want to contribute, feel free to reach out!