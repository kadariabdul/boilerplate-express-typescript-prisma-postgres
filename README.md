# Shopping Cart
# Node.js Shopping Cart application using Prisma and PostgreSQL with Express TypeScript 

This repository contains a sample project that demonstrates how to use Prisma with PostgreSQL. This project serves as a starting point for building web applications that rely on a PostgreSQL database for data storage.

## Getting Started

Follow these steps to get the project up and running on your local machine:

1. **Clone the Repository**: Clone this repository to your local machine using Git.

   ```bash
   git clone https://github.com/Node-AL/prisma-postgresql-without-graphql.git

2. **Install Dependencies**: Navigate to the project directory and install the required dependencies using npm or yarn.

   ```bash
   cd prisma-postgresql-without-graphql
   npm install
   # or
   yarn install
   ```

3. **Set Up PostgreSQL Database**: Create a PostgreSQL database for the project and update the database connection details in the `schema.prisma` file.

4. **Generate Prisma Client**: Generate the Prisma Client by running the following command:
   ```bash
   npx prisma generate
    # or
    yarn prisma generate
   ```
5. **Run Migrations**: Run Prisma migrations to create the necessary database tables.

   ```bash
    npx prisma migrate dev
    # or
    yarn prisma migrate dev
   ```

6. **Build the Application**: Build the application using the following command:

   ```bash
   npm run build
   # or
   yarn build
   ```
6. **Start the Application**: Start the application using the following command:

   ```bash
   npm run start
   # or
   yarn start
   ```

7. **Access the Application**: The application should now be running locally. Access it in your web browser at `http://localhost:3000`.

## Project Structure

The project follows a typical structure for a Node.js application with Prisma. Here are the main directories and their purposes:

- **src**: Contains the source code for the application.
  - **controllers**: Controllers handle HTTP requests and responses.
  - **middlewares**: Middleware functions for request processing.
  - **routes**: Define routes for the application.
  - **services**: Business logic services.
  - **index.ts**: The main entry point of the application.
- **prisma**: prisma migration files for database schema changes and mirations.
- **package.json**: Project dependencies and scripts.

## Contributing

If you find any issues or have suggestions for improvements, please open an issue or create a pull request. Contributions are welcome!

## Acknowledgments

This project was created as a simple starting point for building web applications with Prisma and PostgreSQL . Thanks to the Prisma and PostgreSQL communities for their excellent tools and documentation.

Happy coding!