# AiChatbot Frontend

This is the frontend for the AiChatbot application, built with React and Vite.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Building for Production

```bash
# Build the application
npm run build

# Preview the built application
npm run preview
```

## Deployment to Vercel

This project is configured for easy deployment to Vercel. You can deploy in two ways:

### 1. Using Vercel Dashboard

1. Push your code to GitHub
2. Import your repository in the Vercel dashboard
3. Set the root directory to `Frontend`
4. Configure environment variables:
   - `VITE_API_URL`: Your backend API URL
5. Deploy

### 2. Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Environment Variables

Copy `.env.example` to `.env` and update the values:

```
VITE_API_URL=http://localhost:3000/api  # Development
# VITE_API_URL=https://your-backend.vercel.app/api  # Production
```

For more detailed deployment instructions, see the `VERCEL_DEPLOYMENT.md` file in the root directory.
