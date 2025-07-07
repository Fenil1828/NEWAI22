import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null, 
        headers: headers ? headers: null,
        params: params ? params : null,
    })
    
// # Vercel Deployment Guide for AiChatbot

// This guide will help you deploy your AiChatbot application to Vercel with automatic deployments.

// ## Prerequisites

// 1. A Vercel account (sign up at https://vercel.com if you don't have one)
// 2. Your project pushed to GitHub (which you've already done)

// ## Deployment Steps

// ### 1. Deploy the Backend

// 1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
// 2. Click "Add New" → "Project"
// 3. Import your GitHub repository
// 4. Configure the project:
//    - Set the root directory to `Backend`
//    - Framework preset: Other
//    - Build command: Leave empty (uses the one in vercel.json)
//    - Output directory: Leave empty
// 5. Add the following environment variables (from your Backend/.env file):
//    - `MONGODB_URL`
//    - `JWT_SECRET`
//    - `MAIL_HOST`
//    - `MAIL_USER`
//    - `MAIL_PASS`
//    - `GOOGLE_CLIENT_ID`
//    - `GOOGLE_CLIENT_SECRET`
//    - `GOOGLE_REDIRECT_URI` (update this to your production URL)
//    - `SESSION_SECRET`
//    - `GROQ_API_KEY`
// 6. Click "Deploy"
// 7. Once deployed, note the URL (e.g., `https://aichatbot-backend.vercel.app`)

// ### 2. Deploy the Frontend

// 1. Go back to [Vercel Dashboard](https://vercel.com/dashboard)
// 2. Click "Add New" → "Project"
// 3. Import the same GitHub repository
// 4. Configure the project:
//    - Set the root directory to `Frontend`
//    - Framework preset: Vite
//    - Build command: Leave empty (uses the one in vercel.json)
//    - Output directory: Leave empty
// 5. Add the following environment variables:
//    - `URL` = Your backend URL from step 1.7 (e.g., `https://aichatbot-backend.vercel.app`)
// 6. Click "Deploy"

// ### 3. Set Up Automatic Deployments

// Vercel automatically sets up GitHub integration when you deploy. This means:

// - Any push to your main branch will trigger a new deployment
// - Pull request previews will be generated automatically
// - You can configure additional settings in the Vercel dashboard

// ## Troubleshooting

// 1. **CORS Issues**: If you encounter CORS errors, check that the backend's CORS configuration is correctly set to allow your frontend domain.

// 2. **Environment Variables**: Ensure all environment variables are correctly set in Vercel.

// 3. **Build Failures**: Check the build logs in Vercel for specific error messages.

// ## Alternative: Single Project Deployment

// If you prefer to deploy as a single project instead of separate frontend and backend:

// 1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
// 2. Click "Add New" → "Project"
// 3. Import your GitHub repository
// 4. Use the root directory (where the root vercel.json is located)
// 5. Add all the environment variables mentioned above
// 6. Click "Deploy"

// This approach will use the root vercel.json configuration to route API requests to your backend service.

// ## Monitoring and Logs

// After deployment, you can monitor your application and view logs from the Vercel dashboard:

// 1. Go to your project in the Vercel dashboard
// 2. Click on "Deployments" to see all deployments
// 3. Click on a specific deployment to view details and logs

// ## Next Steps

// - Set up a custom domain in Vercel dashboard
// - Configure additional environment variables as needed
// - Set up monitoring and analytics
}









