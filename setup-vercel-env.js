// Script to help set up Vercel environment variables
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to read .env file and extract variables
function readEnvFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return {};
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const envVars = {};
    
    for (const line of lines) {
      // Skip comments and empty lines
      if (line.trim().startsWith('#') || !line.trim()) continue;
      
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const [, key, value] = match;
        envVars[key.trim()] = value.trim();
      }
    }
    
    return envVars;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return {};
  }
}

// Function to check if Vercel CLI is installed
function isVercelInstalled() {
  try {
    execSync('vercel --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Main function
async function main() {
  console.log('🚀 Vercel Environment Setup Helper');
  console.log('----------------------------------------');
  
  // Check for Vercel CLI
  if (!isVercelInstalled()) {
    console.log('❌ Vercel CLI not found. Please install it with: npm install -g vercel');
    process.exit(1);
  }
  
  console.log('✅ Vercel CLI is installed.');
  
  // Read Backend .env file
  const backendEnvPath = path.join(__dirname, 'Backend', '.env');
  const backendEnvVars = readEnvFile(backendEnvPath);
  
  if (Object.keys(backendEnvVars).length === 0) {
    console.log('⚠️ No environment variables found in Backend/.env');
    console.log('Please make sure your Backend/.env file exists and contains the necessary variables.');
    process.exit(1);
  }
  
  console.log('\n📋 Backend Environment Variables Found:');
  for (const key of Object.keys(backendEnvVars)) {
    // Mask sensitive values
    const maskedValue = key.includes('SECRET') || key.includes('KEY') || key.includes('PASS') || key.includes('URL') 
      ? '********' 
      : backendEnvVars[key];
    console.log(`- ${key}=${maskedValue}`);
  }
  
  // Read Frontend .env file
  const frontendEnvPath = path.join(__dirname, 'Frontend', '.env');
  const frontendEnvVars = readEnvFile(frontendEnvPath);
  
  console.log('\n📋 Frontend Environment Variables Found:');
  if (Object.keys(frontendEnvVars).length === 0) {
    console.log('⚠️ No environment variables found in Frontend/.env');
  } else {
    for (const key of Object.keys(frontendEnvVars)) {
      // Mask sensitive values
      const maskedValue = key.includes('SECRET') || key.includes('KEY') || key.includes('PASS') || key.includes('URL') 
        ? '********' 
        : frontendEnvVars[key];
      console.log(`- ${key}=${maskedValue}`);
    }
  }
  
  console.log('\n📝 Instructions for setting up Vercel environment variables:');
  console.log('1. Run "vercel" in the Backend directory to deploy the backend');
  console.log('2. When prompted, add all the environment variables listed above');
  console.log('3. After backend deployment, note the deployment URL');
  console.log('4. Run "vercel" in the Frontend directory to deploy the frontend');
  console.log('5. Add VITE_API_URL=<your-backend-url>/api as an environment variable');
  
  console.log('\n🔗 Would you like to generate Vercel environment variable commands? (y/n)');
  
  rl.question('> ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      console.log('\n📋 Backend Environment Variable Commands:');
      for (const key of Object.keys(backendEnvVars)) {
        console.log(`vercel env add ${key}`);
      }
      
      console.log('\n📋 Frontend Environment Variable Commands:');
      console.log('vercel env add VITE_API_URL');
    }
    
    console.log('\n✅ Setup complete! Follow the instructions above to deploy your application.');
    rl.close();
  });
}

// Run the main function
main().catch(console.error);