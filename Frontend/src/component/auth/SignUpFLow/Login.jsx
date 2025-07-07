
// // export default SignUp

// import axios from 'axios';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// // A simple spinner component for the loading state
// const Spinner = () => (
//   <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
// );

// const Login = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   /**
//    * Handles the Google login process.
//    * It sets the loading state, fetches the Google auth URL,
//    * and redirects the user.
//    */
//   const handleLogin = async () => {
//     setLoading(true); // Show loader
//     try {
//       const res = await axios.get('http://localhost:3000/api/auth/google/url', {
//         withCredentials: true
//       });
//       // Redirect the user to Google's authentication page.
//       // The current page will be left, so there's no need to set loading to false on success.
//       window.location.href = res.data.url;
//     } catch (error) {
//       console.error("Failed to get Google auth URL:", error);
//       // If an error occurs, stop the loader to allow the user to try again.
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Left side with form */}
//       <div className="relative w-1/2 flex flex-col items-center justify-center bg-black text-white p-8 shadow-2xl shadow-gray-800">

//         <div className="absolute top-5 right-8 flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-xl border border-gray-500/50 rounded-2xl shadow-lg hover:border-gray-600/50 transition-all duration-300 group">
//           <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
//           <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">
//             You are signing into Krupixi
//           </span>
//         </div>

//         {/* Modern gradient background */}
//         <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 opacity-80"></div>

//         {/* Animated background pattern */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
//         </div>

//         <div className="w-full max-w-md relative z-10 backdrop-blur-sm bg-black/30 p-8 rounded-2xl border border-gray-800">
//           {/* Logo with glow effect */}
//           <div className="mb-6 relative group">
//             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-1000"></div>
//             <img src="/src/assets/kw.png"
//               className=''
//               height="46"
//               width="46"
//               alt="Krupixi Logo"
//               onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/46x46/000000/FFFFFF?text=K' }}
//             />
//           </div>

//           <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 text-transparent bg-clip-text">Log into your account</h1>

//           <div className="border-b border-b-gray-800 w-[80%] flex items-center justify-center align-middle mb-5 ml-8">
//             {/* Divider */}
//           </div>

//           {/* Sign up buttons */}
//           <div className="flex flex-col gap-4">
//             <button
//               onClick={() => navigate("/login/user")}
//               className="flex items-center justify-center gap-2 border border-gray-600 rounded-full py-2 px-4 w-full hover:bg-gray-800 transition-all duration-300 backdrop-blur-sm bg-black/30"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
//                 <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
//               </svg>
//               <span>Sign up with email</span>

//             </button>

//             <button
//               onClick={handleLogin}
//               disabled={loading} // Disable button when loading
//               className="flex items-center justify-center gap-3 border border-gray-600 rounded-full py-2 px-4 w-full hover:bg-gray-800 transition-all duration-300 backdrop-blur-sm bg-black/30 disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <>
//                   <Spinner />
//                   <span>Signing in...</span>
//                 </>
//               ) : (
//                 <>
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
//                     <g>
//                       <path fill="#4285F4" d="M43.611 20.083h-1.861V20H24v8h11.284c-1.629 4.657-6.084 8-11.284 8-6.627 0-12-5.373-12-12s5.373-12 12-12c2.805 0 5.384.966 7.421 2.559l6.343-6.343C34.058 5.053 29.284 3 24 3 12.954 3 4 11.954 4 23s8.954 20 20 20c11.045 0 19.818-7.969 19.818-20 0-1.341-.138-2.651-.207-3.917z" />
//                       <path fill="#34A853" d="M6.306 14.691l6.571 4.822C14.655 16.076 19.009 13 24 13c2.805 0 5.384.966 7.421 2.559l6.343-6.343C34.058 5.053 29.284 3 24 3 16.318 3 9.656 7.658 6.306 14.691z" />
//                       <path fill="#FBBC05" d="M24 43c5.084 0 9.824-1.682 13.445-4.564l-6.194-5.066C28.795 35.861 26.486 36.5 24 36.5c-5.17 0-9.617-3.345-11.282-8.002l-6.57 5.077C9.646 40.342 16.318 45 24 45z" />
//                       <path fill="#EA4335" d="M43.611 20.083h-1.861V20H24v8h11.284c-1.025 2.927-3.176 5.47-6.033 7.37l.009.007 6.194 5.066C39.506 38.353 44 32.5 44 24c0-1.341-.138-2.651-.207-3.917z" />
//                     </g>
//                   </svg>
//                   <span>Sign up with Google</span>
//                 </>
//               )}
//             </button>
//           </div>

//           {/* Sign in link */}
//           <div className="mt-8 text-center">
//             <p className="text-gray-400">
//               Don't have an account?  <a href="/signup" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 border-b border-transparent hover:border-blue-300">Sign up</a>
//             </p>
//           </div>

//           {/* Terms of service */}
//           <div className="mt-8 text-xs text-gray-500">
//             <p>By continuing, you agree to XI's <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 border-b border-transparent hover:border-blue-300">Terms of Service</a> and <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 border-b border-transparent hover:border-blue-300">Privacy Policy</a>.</p>
//           </div>
//         </div>
//       </div>

//       {/* Right side with image */}
//       <div className="w-1/2 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden flex items-center justify-center">
//         <div className="absolute inset-0 opacity-30">
//           <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white opacity-10">
//             <path fill="currentColor" d="M200,0 C310.457,0 400,89.543 400,200 C400,310.457 310.457,400 200,400 C89.543,400 0,310.457 0,200 C0,89.543 89.543,0 200,0 Z M200,40 C111.634,40 40,111.634 40,200 C40,288.366 111.634,360 200,360 C288.366,360 360,288.366 360,200 C360,111.634 288.366,40 200,40 Z"></path>
//           </svg>
//         </div>
//         <div className="absolute inset-0 bg-gradient-to-l from-white/30 to-transparent"></div>
//         <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-white/40 to-transparent "></div>
//         <div className="relative z-10 flex items-center justify-center w-3/4 h-3/4 ">
//           <img
//             src="/src/assets/k.png"
//             alt="Logo"
//             className="max-w-full max-h-full object-contain"
//             onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/000000/FFFFFF?text=K' }}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login;

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// A simple spinner component for the loading state
const Spinner = () => (
  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
);

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Handles the Google login process.
   * It sets the loading state, fetches the Google auth URL,
   * and redirects the user.
   */
  const handleLogin = async () => {
    setLoading(true); // Show loader
    try {
      const res = await axios.get('http://localhost:3000/api/auth/google/url', {
        withCredentials: true
      });
      // Redirect the user to Google's authentication page.
      // The current page will be left, so there's no need to set loading to false on success.
      window.location.href = res.data.url;
    } catch (error) {
      console.error("Failed to get Google auth URL:", error);
      // If an error occurs, stop the loader to allow the user to try again.
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side with form - Full width on mobile, half width on desktop */}
      <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center bg-black text-white p-4 sm:p-6 lg:p-8 shadow-2xl shadow-gray-800">

        {/* Status indicator - Responsive positioning */}
        <div className="absolute top-4 right-4 sm:top-5 sm:right-8 flex items-center gap-2 px-3 py-2 sm:px-4 bg-black/30 backdrop-blur-xl border border-gray-500/50 rounded-2xl shadow-lg hover:border-gray-600/50 transition-all duration-300 group">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm text-gray-300 font-medium group-hover:text-white transition-colors">
            You are signing into Krupixi
          </span>
        </div>

        {/* Modern gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 opacity-80"></div>

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>

        <div className="w-full max-w-md relative z-10 backdrop-blur-sm bg-black/30 p-4 sm:p-6 lg:p-8 rounded-2xl border border-gray-800">
          {/* Logo with glow effect */}
          <div className="mb-4 sm:mb-6 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-1000"></div>
            <img src="/src/assets/kw.png"
              className=''
              height="46"
              width="46"
              alt="Krupixi Logo"
              onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/46x46/000000/FFFFFF?text=K' }}
            />
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 text-transparent bg-clip-text">Log into your account</h1>

          <div className="border-b border-b-gray-800 w-[80%] flex items-center justify-center align-middle mb-4 sm:mb-5 ml-4 sm:ml-8">
            {/* Divider */}
          </div>

          {/* Sign up buttons */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/login/user")}
              className="flex items-center justify-center gap-2 border border-gray-600 rounded-full py-2.5 sm:py-3 px-4 w-full hover:bg-gray-800 transition-all duration-300 backdrop-blur-sm bg-black/30 text-sm sm:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
              <span>Sign up with email</span>
            </button>

            <button
              onClick={handleLogin}
              disabled={loading} // Disable button when loading
              className="flex items-center justify-center gap-3 border border-gray-600 rounded-full py-2.5 sm:py-3 px-4 w-full hover:bg-gray-800 transition-all duration-300 backdrop-blur-sm bg-black/30 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <Spinner />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-4 w-4 sm:h-5 sm:w-5">
                    <g>
                      <path fill="#4285F4" d="M43.611 20.083h-1.861V20H24v8h11.284c-1.629 4.657-6.084 8-11.284 8-6.627 0-12-5.373-12-12s5.373-12 12-12c2.805 0 5.384.966 7.421 2.559l6.343-6.343C34.058 5.053 29.284 3 24 3 12.954 3 4 11.954 4 23s8.954 20 20 20c11.045 0 19.818-7.969 19.818-20 0-1.341-.138-2.651-.207-3.917z" />
                      <path fill="#34A853" d="M6.306 14.691l6.571 4.822C14.655 16.076 19.009 13 24 13c2.805 0 5.384.966 7.421 2.559l6.343-6.343C34.058 5.053 29.284 3 24 3 16.318 3 9.656 7.658 6.306 14.691z" />
                      <path fill="#FBBC05" d="M24 43c5.084 0 9.824-1.682 13.445-4.564l-6.194-5.066C28.795 35.861 26.486 36.5 24 36.5c-5.17 0-9.617-3.345-11.282-8.002l-6.57 5.077C9.646 40.342 16.318 45 24 45z" />
                      <path fill="#EA4335" d="M43.611 20.083h-1.861V20H24v8h11.284c-1.025 2.927-3.176 5.47-6.033 7.37l.009.007 6.194 5.066C39.506 38.353 44 32.5 44 24c0-1.341-.138-2.651-.207-3.917z" />
                    </g>
                  </svg>
                  <span>Sign up with Google</span>
                </>
              )}
            </button>
          </div>

          {/* Sign in link */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-gray-400 text-sm sm:text-base">
              Don't have an account?  <a href="/signup" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 border-b border-transparent hover:border-blue-300">Sign up</a>
            </p>
          </div>

          {/* Terms of service */}
          <div className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500">
            <p>By continuing, you agree to XI's <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 border-b border-transparent hover:border-blue-300">Terms of Service</a> and <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 border-b border-transparent hover:border-blue-300">Privacy Policy</a>.</p>
          </div>
        </div>
      </div>

      {/* Right side with image - Hidden on mobile, visible on large screens */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-30">
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white opacity-10">
            <path fill="currentColor" d="M200,0 C310.457,0 400,89.543 400,200 C400,310.457 310.457,400 200,400 C89.543,400 0,310.457 0,200 C0,89.543 89.543,0 200,0 Z M200,40 C111.634,40 40,111.634 40,200 C40,288.366 111.634,360 200,360 C288.366,360 360,288.366 360,200 C360,111.634 288.366,40 200,40 Z"></path>
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-white/30 to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-white/40 to-transparent "></div>
        <div className="relative z-10 flex items-center justify-center w-3/4 h-3/4 ">
          <img
            src="/src/assets/k.png"
            alt="Logo"
            className="max-w-full max-h-full object-contain"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/000000/FFFFFF?text=K' }}
          />
        </div>
      </div>
    </div>
  )
}

export default Login;