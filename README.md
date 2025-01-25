# Medoc Project

## Overview

Medoc is a backend service built with Node.js, TypeScript, and Express. It provides an API layer for managing users, audit logs, and other functionalities with a robust and modular architecture. The project is designed to ensure scalability, performance, and maintainability.

---

## Features

- User Authentication and Authorization using `jsonwebtoken`.
- Secure password hashing with `bcryptjs`.
- Input validation with `joi` and `class-validator`.
- MongoDB integration using `mongoose`.
- Centralized logging with `pino` and `pino-pretty`.
- Modular TypeScript structure for easy maintenance.

---

## Requirements

To run this project, you need:

- Node.js >= 16.0.0
- npm >= 7.0.0
- MongoDB >= 5.0

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd admin-backend
   cd user-backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables as in env.example

---

## Scripts

### Start the Project

- **Production Mode:**

  ```bash
  npm start
  ```

  Runs the compiled code from the `dist` folder.

- **Development Mode:**
  ```bash
  npm run start:dev
  ```
  Uses `nodemon` for hot-reloading during development.

### Linting and Formatting

- Run ESLint:
  ```bash
  npx eslint .
  ```
- Format with Prettier:
  ```bash
  npx prettier --write .
  ```

## API Endpoints

    - Go to the postman link: https://documenter.getpostman.com/view/28376298/2sAYQfEpxP
