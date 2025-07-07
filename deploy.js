// Simple deployment helper script
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if Vercel CLI is installed
function checkVercelCLI() {
  try {
    execSync('vercel --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Main function
function main() {
  console.log('🚀 AiChatbot Vercel Deployment Helper');
  console.log('----------------------------------------');
  
  // Check for Vercel CLI
  if (!checkVercelCLI()) {
    console.log('❌ Vercel CLI not found. Installing...');
    try {
      execSync('npm install -g vercel', { stdio: 'inherit' });
      console.log('✅ Vercel CLI installed successfully!');
    } catch (error) {
      console.error('❌ Failed to install Vercel CLI. Please install it manually with: npm install -g vercel');
      process.exit(1);
    }
  } else {
    console.log('✅ Vercel CLI is already installed.');
  }

  // Check for vercel.json files
  const rootVercelJson = fs.existsSync(path.join(__dirname, 'vercel.json'));
  const frontendVercelJson = fs.existsSync(path.join(__dirname, 'Frontend', 'vercel.json'));
  const backendVercelJson = fs.existsSync(path.join(__dirname, 'Backend', 'vercel.json'));

  console.log('\nVercel configuration files:');
  console.log(`- Root vercel.json: ${rootVercelJson ? '✅' : '❌'}`);
  console.log(`- Frontend vercel.json: ${frontendVercelJson ? '✅' : '❌'}`);
  console.log(`- Backend vercel.json: ${backendVercelJson ? '✅' : '❌'}`);

  // Deployment options
  console.log('\n📋 Deployment Options:');
  console.log('1. Deploy Backend');
  console.log('2. Deploy Frontend');
  console.log('3. Deploy Both (Separately)');
  console.log('4. Deploy as Monorepo (Single Project)');
  console.log('\nPlease choose an option by running:');
  console.log('node deploy.js <option-number>');
  console.log('\nFor example: node deploy.js 4');
  
  // Check if an option was provided
  const option = process.argv[2];
  if (option) {
    switch (option) {
      case '1':
        console.log('\n🚀 Deploying Backend...');
        try {
          process.chdir(path.join(__dirname, 'Backend'));
          execSync('vercel', { stdio: 'inherit' });
        } catch (error) {
          console.error('❌ Backend deployment failed:', error.message);
        }
        break;
      case '2':
        console.log('\n🚀 Deploying Frontend...');
        try {
          process.chdir(path.join(__dirname, 'Frontend'));
          execSync('vercel', { stdio: 'inherit' });
        } catch (error) {
          console.error('❌ Frontend deployment failed:', error.message);
        }
        break;
      case '3':
        console.log('\n🚀 Deploying Backend...');
        try {
          process.chdir(path.join(__dirname, 'Backend'));
          execSync('vercel', { stdio: 'inherit' });
          console.log('\n🚀 Deploying Frontend...');
          process.chdir(path.join(__dirname, 'Frontend'));
          execSync('vercel', { stdio: 'inherit' });
        } catch (error) {
          console.error('❌ Deployment failed:', error.message);
        }
        break;
      case '4':
        console.log('\n🚀 Deploying as Monorepo...');
        try {
          process.chdir(__dirname);
          execSync('vercel', { stdio: 'inherit' });
        } catch (error) {
          console.error('❌ Monorepo deployment failed:', error.message);
        }
        break;
      default:
        console.log('❌ Invalid option. Please choose 1, 2, 3, or 4.');
    }
  }

  console.log('\n📚 For detailed deployment instructions, please read VERCEL_DEPLOYMENT.md');
}

// Run the main function
main();