// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { sendOtp } from '../../../../Apis/authApi';
// import { use } from 'react';
// // import { sendOtp } from '../Apis/authApi';

// const EmailStep = () => {

//     const [email , setEmail] = useState("");
//     const [error , setError] = useState("");
//     const [loading , setLoading] = useState(false);
//     const navigate = useNavigate();

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     setError("")
//     //     setLoading(true)

//     //     try{
//     //         const res = await sendOtp(email)
            
//     //         navigate("/signup/otp", { state: { email } });
//     //     }
//     //     catch(error){
//     //         setError(error.message)
//     //     }
//     //     setLoading(false)
//     // }
//     const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//         const res = await sendOtp(email);

//         // Store email in sessionStorage for persistence
//         sessionStorage.setItem("signupEmail", email);

//         navigate("/signup/otp", { state: { email } });
//     } catch (error) {
//         setError(error.message);
//     }
//     setLoading(false);
// }


//   return (
//       <form onSubmit={handleSubmit}>

//         <div className="flex min-h-screen">
//       {/* Left side with form */}
//       <div className="relative w-1/2 flex flex-col items-center justify-center bg-black text-white p-8 shadow-2xl shadow-gray-800 relative backdrop-blur-lg">

//         <div className="absolute top-5 right-8 flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-xl border border-gray-500/50 rounded-2xl shadow-lg hover:border-gray-600/50 transition-all duration-300 group">
//           <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
//           <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">
//             You are signing into Krupixi
//           </span>
//         </div>


//                 <h1 className='mb-15 font-semibold text-3xl text-white'>
//                     Sign up with your email
//                 </h1>
                
//                 <div className='w-[400px] mb-10'>
//                     <label for="email" class="block mb-2 text-sm font-medium text-gray-400">Email</label>
//                     <input 
//                         type="email" 
//                         name="email" 
//                         id="email"
//                         value={email}
//                         onChange={e => setEmail(e.target.value)}
//                         placeholder="Enter your email"
//                         class="w-full px-4 py-3 text-white bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>

     
//                 <div class="relative space-y-4 w-[400px]">
      
//                     <button type="submit" class="w-full py-3 font-semibold text-black transition-colors bg-white rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white">
//                           {loading ? "Sending..." : "Send OTP"}
//                     </button>

    
//                     <button type="button" class="w-full py-3 font-semibold text-white transition-colors bg-transparent border border-gray-600 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-gray-500">
//                         Go back
//                     </button>
//                 </div>     

//                 {/* Terms of service with improved styling */}
//           <div className="absolute bottom-6 text-xs text-gray-500">
//             <p>By continuing, you agree to Krupixi's <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 border-b border-transparent hover:border-blue-300">Terms of Service</a> and <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 border-b border-transparent hover:border-blue-300">Privacy Policy</a>.</p>
//           </div>

//       </div>
      
//       {/* Right side with basic flash effect */}
//       <div className="w-1/2 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden flex items-center justify-center">
//         {/* Background SVG */}
//         <div className="absolute inset-0 opacity-30">
//           <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white opacity-10">
//             <path fill="currentColor" d="M200,0 C310.457,0 400,89.543 400,200 C400,310.457 310.457,400 200,400 C89.543,400 0,310.457 0,200 C0,89.543 89.543,0 200,0 Z M200,40 C111.634,40 40,111.634 40,200 C40,288.366 111.634,360 200,360 C288.366,360 360,288.366 360,200 C360,111.634 288.366,40 200,40 Z"></path>
//           </svg>
//         </div>
        
//         {/* Simple flash effect - just two basic layers */}
//         {/* Basic light gradient from right to left */}
//         <div className="absolute inset-0 bg-gradient-to-l from-white/30 to-transparent"></div>
        
//         {/* Simple light beam */}
//         <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-white/40 to-transparent "></div>
        
//         {/* Logo Image */}
//         <div className="relative z-10 flex items-center justify-center w-3/4 h-3/4 ">
//           <img 
//             src="/src/assets/k.png" 
//             alt="Logo" 
//             className="max-w-full max-h-full object-contain"
//           />
//         </div>
//       </div>
//     </div>

//       </form>
//   )
// }

// export default EmailStep

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendOtp } from '../../../../Apis/authApi'

const EmailStep = () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await sendOtp(email)
      sessionStorage.setItem("signupEmail", email)
      navigate("/signup/otp", { state: { email } })
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left side with form */}
        <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center bg-black text-white p-8 shadow-2xl shadow-gray-800 backdrop-blur-lg min-h-screen">
          <div className="absolute top-5 right-8 flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-xl border border-gray-500/50 rounded-2xl shadow-lg hover:border-gray-600/50 transition-all duration-300 group">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">
              You are signing into Krupixi
            </span>
          </div>

          <h1 className="mb-8 font-semibold text-3xl text-white text-center">
            Sign up with your email
          </h1>

          <div className="w-full max-w-[400px] mb-10">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-400">
              Email
            </label>
            <input 
              type="email" 
              name="email" 
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 text-white bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <div className="mb-4 text-red-400">{error}</div>}

          <div className="relative space-y-4 w-full max-w-[400px]">
            <button
              type="submit"
              className="w-full py-3 font-semibold text-black transition-colors bg-white rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>

            <button
              type="button"
              className="w-full py-3 font-semibold text-white transition-colors bg-transparent border border-gray-600 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-gray-500"
              onClick={() => navigate(-1)}
            >
              Go back
            </button>
          </div>

          {/* Terms of service */}
          <div className="absolute bottom-6 text-xs text-gray-500 text-center w-full">
            <p>
              By continuing, you agree to Krupixi's{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 border-b border-transparent hover:border-blue-300">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 border-b border-transparent hover:border-blue-300">
                Privacy Policy
              </a>.
            </p>
          </div>
        </div>

        {/* Right side with image - hidden on mobile, visible on lg screens and up */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden items-center justify-center">
          {/* Background SVG */}
          <div className="absolute inset-0 opacity-30">
            <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white opacity-10">
              <path fill="currentColor" d="M200,0 C310.457,0 400,89.543 400,200 C400,310.457 310.457,400 200,400 C89.543,400 0,310.457 0,200 C0,89.543 89.543,0 200,0 Z M200,40 C111.634,40 40,111.634 40,200 C40,288.366 111.634,360 200,360 C288.366,360 360,288.366 360,200 C360,111.634 288.366,40 200,40 Z"></path>
            </svg>
          </div>
          {/* Basic light gradient from right to left */}
          <div className="absolute inset-0 bg-gradient-to-l from-white/30 to-transparent"></div>
          {/* Simple light beam */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-white/40 to-transparent "></div>
          {/* Logo Image */}
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
    </form>
  )
}

export default EmailStep
