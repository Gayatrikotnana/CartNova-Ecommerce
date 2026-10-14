# 🛍️ CartNova – Full-Stack E-Commerce Application

CartNova is a full-stack e-commerce application built using **Java, Spring Boot Microservices, React, and MySQL**. It provides an online shopping experience with product browsing, shopping cart management, order processing, JWT-based authentication, and simulated payment options.

## 🚀 Features

- **User Authentication:** Login and JWT-based authentication.
- **Product Management:** Browse products and view product details and stock.
- **Search & Categories:** Search products and filter by category.
- **Shopping Cart:** Add products, update quantities, remove items, and calculate totals.
- **Order Management:** Place orders and view order history.
- **Payment Options:** Cash on Delivery and simulated online payment.
- **Microservices Architecture:** Independent services for users, products, carts, orders, and payments.
- **Service Discovery:** Eureka Server for service registration and discovery.
- **API Gateway:** Centralized routing for backend APIs.
- **Responsive UI:** React-based shopping interface.

## 🛠️ Technologies Used

### Backend
- Java 21
- Spring Boot
- Spring Cloud
- Spring Security
- JWT Authentication
- REST APIs
- Maven
- MySQL

### Frontend
- React
- Vite
- JavaScript
- HTML5
- CSS3

### Tools
- IntelliJ IDEA
- Visual Studio Code
- Postman
- Git and GitHub
- MySQL Workbench

## 🏗️ Architecture

The application follows a microservices architecture.

- **Eureka Server:** Service registration and discovery.
- **API Gateway:** Routes client requests to backend services.
- **User Service:** User management and authentication.
- **Product Service:** Product information and stock management.
- **Cart Service:** Shopping cart operations.
- **Order Service:** Order creation and management.
- **Payment Service:** Payment records and simulated payment processing.
- **React Frontend:** User interface for shopping and checkout.

## ⚙️ Prerequisites

Install the following before running the application:

- Java 21
- Maven
- Node.js and npm
- MySQL Server
- Git

## ▶️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/CartNova-Ecommerce.git
cd CartNova-Ecommerce
```

Replace `YOUR-USERNAME` with your GitHub username.

### 2. Configure MySQL

Create the required database and configure the database connection for the relevant backend services.

Update your local configuration with your MySQL username and password. Do not commit passwords or other secrets to GitHub.

### 3. Start the Backend Services

Open the backend projects in IntelliJ IDEA and start the services in the appropriate order:

1. Eureka Server
2. Backend microservices
3. API Gateway

Verify each service's configured port and database settings before starting it.

### 4. Start the React Frontend

Navigate to the frontend directory:

```bash
cd frontend/cartnova-react
npm install
npm run dev
```

Open the local URL displayed by Vite in your terminal.

Ensure the API Gateway URL configured in the frontend matches your backend setup.

## 🔐 Security

- JWT-based authentication for protected endpoints.
- Sensitive configuration values should be supplied locally and excluded from version control.
- Configure suitable authorization rules for each protected API.

## 💳 Payment Disclaimer

CartNova uses simulated payment functionality for demonstration and learning purposes. The demo QR code is not intended for real payments, and no real money is transferred.

## 🎯 Learning Outcomes

This project demonstrates practical experience with:

- Java and Spring Boot backend development.
- Microservices architecture and service discovery.
- REST API development and integration.
- Spring Security and JWT authentication.
- React frontend development.
- MySQL database integration.
- API testing using Postman.
- Git and GitHub version control.

## 🔮 Future Enhancements

- Kafka-based asynchronous communication.
- Docker containerization.
- Cloud deployment using AWS.
- Integration with a payment provider's test environment.
- Automated unit and integration testing.

## 👩‍💻 Author

**Your Name**

GitHub userName: Gayatrikotnana

---

⭐ If you find this project useful, consider giving the repository a star!
