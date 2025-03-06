# SecondDeal 🛒 - Backend for Marketplace for Buying & Selling Used Items

The **SecondDeal Backend** provides a REST API for the **SecondDeal** platform, which is a marketplace web application for buying and selling used items. This API handles user authentication, item listings, purchases, transactions, and communication between buyers and sellers.

## Project Overview

This backend service handles requests for creating and managing user accounts, product listings, transactions, and more. It uses **Express.js** to serve API routes, **MongoDB** for data storage, and **JWT** for secure authentication.

## Key Features

### Authentication

- **User Registration**: Users can register with email and password.
- **JWT Authentication**: Secure user login and token-based authentication.
- **Password Hashing**: Uses **bcrypt** to securely hash user passwords.

### Listings & Transactions

- **CRUD Listings**: Users can create, read, update, and delete their listings.
- **Listing Management**: Users can mark items as "Sold" after a transaction.
- **Purchase History**: Users can track their purchases and sales.
- **Transaction Management**: Handling creation and updating of transactions for purchases and sales.

### User Management

- **User Profile**: Users can update their personal details, view purchase and sales history.
- **Admin Management (Optional)**: Admins can manage users and listings (planned for future features).

### Messaging & Communication (Optional)

- **Messages**: Users can send messages to each other about specific listings (coming soon).

## Tech Stack

- **Backend**:

  - **Express.js**: REST API framework
  - **MongoDB**: NoSQL database for storing user and product data
  - **Mongoose**: ODM for MongoDB
  - **JWT**: Secure token-based authentication
  - **bcrypt**: Password hashing for security
  - **dotenv**: Environment variable management
  - **Zod**: Schema validation for input data validation

- **Development Tools**:
  - **TypeScript**: For type safety
  - **ESLint**: Linting to ensure code quality
  - **Prettier**: Code formatting for consistency
