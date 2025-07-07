# AiChatbot

A full-stack AI chatbot application with React frontend and Express backend.

## Project Structure

- **Frontend**: React application built with Vite
- **Backend**: Express.js API server

## Development

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB account

### Setup

1. Clone the repository
2. Install dependencies:

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd Frontend && npm install

# Install backend dependencies
cd ../Backend && npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both Frontend and Backend directories
   - Update the values in the `.env` files

### Running the Application

From the root directory:

```bash
# Run both frontend and backend concurrently
npm run dev

# Run only frontend
npm run client

# Run only backend
npm run server
```

## Deployment

This project is configured for easy deployment to Vercel. See the `VERCEL_DEPLOYMENT.md` file for detailed instructions.

Quick deployment:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy using the helper script
npm run deploy
```

## Environment Variables

### Frontend

- `VITE_API_URL`: Backend API URL

### Backend

- `MONGODB_URL`: MongoDB connection string
- `PORT`: Server port (default: 3000)
- `JWT_SECRET`: Secret for JWT token generation
- `SESSION_SECRET`: Secret for session management
- `MAIL_HOST`, `MAIL_USER`, `MAIL_PASS`: Email service configuration
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`: Google OAuth configuration
- `GROQ_API_KEY`: API key for Groq AI services
- `FRONTEND_URL`: Frontend URL for CORS configuration

## Features

- User authentication (email/password and Google OAuth)
- AI-powered chat functionality
- User profiles
- Responsive design

## License

ISC