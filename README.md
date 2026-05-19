# ExpenseFlow

ExpenseFlow is a full-stack web application designed for tracking personal expenses and managing monthly budgets. Built with the MERN stack (MongoDB, Express, React, Node.js), it provides a secure and intuitive interface for users to monitor their financial health.

## Features

- **Google OAuth Authentication**: Secure user login and registration using Google accounts.
- **Dashboard & Visualization**: Visual representation of expenses using interactive charts (Chart.js).
- **Expense Tracking**: Full CRUD (Create, Read, Update, Delete) capabilities for financial transactions.
- **Budget Management**: Set and monitor monthly budgets.
- **Responsive Design**: Built with React and Bootstrap for a consistent experience across devices.
- **Secure API**: Backend protected with JWT authentication, Helmet, and request rate limiting.

## Tech Stack

### Frontend
- **React**: UI library
- **React Router DOM**: Client-side routing
- **Bootstrap & React Bootstrap**: Styling and UI components
- **Chart.js & React-Chartjs-2**: Data visualization
- **Axios**: HTTP client
- **@react-oauth/google**: Google OAuth integration

### Backend
- **Node.js & Express**: API server
- **MongoDB & Mongoose**: Database and object modeling
- **jsonwebtoken (JWT)**: API authentication
- **google-auth-library**: Google OAuth token verification
- **Helmet**: Security headers
- **express-rate-limit**: API rate limiting

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)
- Google Cloud Console account (for OAuth credentials)

## Installation and Setup

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd "expence app"
   ```

2. **Setup the Backend**:
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   ```
   Start the backend server:
   ```bash
   npm start
   ```

3. **Setup the Frontend**:
   Open a new terminal window/tab:
   ```bash
   cd client
   npm install
   ```
   Create a `.env` file in the `client` directory and add:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   ```
   Start the React development server:
   ```bash
   npm start
   ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```text
├── client/                 # React frontend application
│   ├── public/             # Static files
│   └── src/                # React components, pages, and API services
├── server/                 # Node.js/Express backend application
│   ├── controllers/        # Route logic and handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route definitions
│   ├── middleware/         # Custom Express middleware
│   └── config/             # Database and application configuration
└── README.md               # Project documentation
```

## License

This project is open-source and available under the ISC License.
