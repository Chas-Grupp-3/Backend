# Chas Advance Backend

A robust backend service for the Chas Advance platform, built with Node.js, Express, and TypeScript. This RESTful API handles user authentication, package management, and user management with JWT-based authentication.

## 🚀 Features

- **User Authentication**

  - Secure registration and login with JWT
  - Password hashing with bcrypt
  - Protected routes with JWT middleware

- **Package Management**

  - Create, read, update, and delete packages
  - List all available packages
  - Get package details by ID

- **User Management**

  - CRUD operations for users
  - Secure password handling
  - Role-based access control

- **Cloud compatible**
  - Server hosted on Azure
  - Postgres database hosted via Azure
  - CI / CD pipeline via Github actions

## 📦 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- PostgreSQL database

## 🛠 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/chas-advance-backend.git
   cd chas-advance-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory

4. Start the development server:
   ```bash
   npm run dev
   ```
   The server will start at `http://localhost:3000`

## 📚 API Documentation

### Authentication

#### Register a new user

```http
POST /login/register
Content-Type: application/json
```

#### Login

```http
POST /login/login
Content-Type: application/json
```

### Packages

#### Get all packages

```http
GET /packages/
Authorization: Bearer <jwt_token>
```

#### Get package by user ID

```http
GET /packages/:userId
Authorization: Bearer <jwt_token>
```

#### Get package by package ID

```http
GET /packages/package:packageId
Authorization: Bearer <jwt_token>
```

#### Create a new package

```http
POST /packages/
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Update a package

```http
PUT /packages/:packageId
Authorization: Bearer <jwt_token>
Content-Type: application/json

```

#### Mark package as delivered

```http
PUT /packages/delivered:packageId
Authorization: Bearer <jwt_token>
```

#### Delete a package

```http
DELETE /packages/:packageId
Authorization: Bearer <jwt_token>
```

### Users

#### Get all users

```http
GET /user/
Authorization: Bearer <jwt_token>
```

#### Get user by ID

```http
GET /user/:userId
Authorization: Bearer <jwt_token>
```

#### Create a new user (Admin only)

```http
POST /user/
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Update user

```http
PUT /user/:userId
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Delete user

```http
DELETE /user/:userId
Authorization: Bearer <jwt_token>
```

**Available Roles:** `admin`, `user`, `driver`

## 🏗 Project Structure

```
chas-advance-backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── middlewares/     # Custom Express middlewares
│   ├── routes/          # API route definitions
│   ├── types/           # TypeScript type definitions
│   └── index.ts         # Application entry point
├── dist/               # Compiled JavaScript files
├── .env                # Environment variables
├── package.json        # Project metadata and scripts
└── tsconfig.json       # TypeScript configuration
```

## 🧪 Testing

Run tests using:

```bash
npm test
```

## 🔄 Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by Chas Advance Team
