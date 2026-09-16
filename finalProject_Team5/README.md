# E-Commerce and Business Backend API

This is the backend service for the project, built with Node.js and Express, connecting to a MongoDB database to handle products, contacts, and user authentication.

## Tech Stack
* Runtime: Node.js
* Framework: Express.js
* Database: MongoDB and Mongoose
* Authentication: JWT (JSON Web Tokens)

---

## Getting Started and Installation

To run this backend locally on your machine, follow these steps:

### 1. Clone the repository
git clone <repository-url>
cd <project-folder>

### 2. Install dependencies
npm install

### 3. Setup Environment Variables
Create a .env file in the root directory and add the following variables:
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here

### 4. Run the server
For development using nodemon:
npm run run:dev

For production:
npm start

---

## API Endpoints

### Products
* GET /api/products - Get all products (Public)
* POST /api/products - Create a new product (Protected - Admin only)
* DELETE /api/products/:id - Delete a product (Protected - Admin only)

### Authentication
* POST /api/auth/register - Register a new user
* POST /api/auth/login - Login user and get token

### Contacts
* POST /api/contacts - Submit a contact message (Public)
* GET /api/contacts - Get all contact messages (Protected - Admin only)

---

## Testing the API
You can test the endpoints using Postman or any similar API client tool. For protected routes, make sure to include the Bearer Token in the request headers under Authorization.
