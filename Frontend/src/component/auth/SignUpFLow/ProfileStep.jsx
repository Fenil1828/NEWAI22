// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { registerUser } from '../../../../Apis/authApi';

// const ProfileStep = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   // Get email from router state or sessionStorage
//   const email = location.state?.email || sessionStorage.getItem("signupEmail") || "";

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Redirect if no email is present
//   useEffect(() => {
//     if (!email) {
//       navigate("/signup");
//     }
//   }, [email, navigate]);

//   function togglePassword() {
//     setShowPassword((prev) => !prev);
//   }

//   function goBack() {
//     window.history.back();
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     const result = await registerUser({ email, firstName, lastName, password });
//     setLoading(false);
//     if (result.success === false) {
//       setError(result.message);
//     } else {
//       sessionStorage.removeItem("signupEmail");
//       navigate("/login");
//     }
//   };

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Left side with form */}
//       <div className="relative w-1/2 flex flex-col items-center justify-center bg-black text-white p-8 shadow-2xl shadow-gray-800 relative backdrop-blur-lg">
//         <div>
//           <h1 className="text-[2.2rem] font-normal mb-5 text-white ml-9">
//             Complete your sign up
//           </h1>
//           <div className="max-w-[60%] ml-18 bg-[#2d2d2d] border border-[#404040] rounded-3xl px-2 py-1 mb-12 flex items-center gap-2 text-[#cccccc]">
//             <svg className="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
//             </svg>
//             {email}
//           </div>
//           <form onSubmit={handleSubmit} className='w-[100%]'>
//             <div className="flex gap-4 mb-6">
//               <div className="flex-1 text-left">
//                 <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-[#cccccc]">
//                   First name
//                 </label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   name="firstName"
//                   className="w-full px-4 py-3 border border-[#404040] rounded-md bg-[#2d2d2d] text-white text-base focus:outline-none focus:border-[#666666] transition"
//                   value={firstName}
//                   onChange={e => setFirstName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="flex-1 text-left">
//                 <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-[#cccccc]">
//                   Last name
//                 </label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   name="lastName"
//                   className="w-full px-4 py-3 border border-[#404040] rounded-md bg-[#2d2d2d] text-white text-base focus:outline-none focus:border-[#666666] transition"
//                   value={lastName}
//                   onChange={e => setLastName(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="mb-6 text-left">
//               <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#cccccc]">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   name="password"
//                   className="w-full px-4 py-3 border border-[#404040] rounded-md bg-[#2d2d2d] text-white text-base focus:outline-none focus:border-[#666666] transition"
//                   value={password}
//                   onChange={e => setPassword(e.target.value)}
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 -translate-y-1/2 bg-none border-none text-[#888888] cursor-pointer p-1"
//                   onClick={togglePassword}
//                   tabIndex={-1}
//                 >
//                   {showPassword ? (
//                     // Eye closed icon
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
//                       <line x1="1" y1="1" x2="23" y2="23"></line>
//                     </svg>
//                   ) : (
//                     // Eye open icon
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//                       <circle cx="12" cy="12" r="3"></circle>
//                     </svg>
//                   )}
//                 </button>
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="w-full py-3 rounded-full font-medium text-base bg-[#f0f0f0] text-[#1a1a1a] transition hover:bg-[#e0e0e0] mb-4"
//               disabled={loading}
//             >
//               {loading ? "Registering..." : "Register"}
//             </button>
//             <button
//               type="button"
//               className="w-full py-3 rounded-full font-medium text-base bg-transparent border border-[#404040] text-[#cccccc] transition hover:bg-[#2d2d2d]"
//               onClick={goBack}
//             >
//               Go back
//             </button>
//             {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
//           </form>
//         </div>
//         {/* ...terms and right side as before... */}
//       </div>
//       {/* ...right side code as before... */}
//       <div className="w-1/2 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden flex items-center justify-center">
//         {/* Background SVG */}
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
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileStep;


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { registerUser } from '../../../../Apis/authApi';

const ProfileStep = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || sessionStorage.getItem("signupEmail") || "";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/login/user");
    }
  }, [email, navigate]);

  function togglePassword() {
    setShowPassword((prev) => !prev);
  }

  function goBack() {
    navigate(-1);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await registerUser({ email, firstName, lastName, password });
    setLoading(false);
    if (result.success === false) {
      setError(result.message);
    } else {
      sessionStorage.removeItem("signupEmail");
      navigate("/login");
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row overflow-hidden">
      {/* Left side with form */}
      <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center bg-black text-white p-8 shadow-2xl shadow-gray-800 backdrop-blur-lg min-h-screen">
        <div className="w-full max-w-lg">
          <h1 className="text-3xl font-semibold mb-5 text-white">
            Complete your sign up
          </h1>
          <div className="max-w-full bg-[#2d2d2d] border border-[#404040] rounded-3xl px-4 py-2 mb-12 flex items-center gap-2 text-[#cccccc]">
            <svg className="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span className="break-all">{email}</span>
          </div>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 text-left">
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-[#cccccc]">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full px-4 py-3 border border-[#404040] rounded-md bg-[#2d2d2d] text-white text-base focus:outline-none focus:border-[#666666] transition"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1 text-left">
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-[#cccccc]">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full px-4 py-3 border border-[#404040] rounded-md bg-[#2d2d2d] text-white text-base focus:outline-none focus:border-[#666666] transition"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-6 text-left">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#cccccc]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full px-4 py-3 border border-[#404040] rounded-md bg-[#2d2d2d] text-white text-base focus:outline-none focus:border-[#666666] transition"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-none border-none text-[#888888] cursor-pointer p-1"
                  onClick={togglePassword}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    // Eye closed icon
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    // Eye open icon
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full font-medium text-base bg-[#f0f0f0] text-[#1a1a1a] transition hover:bg-[#e0e0e0] mb-4"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <button
              type="button"
              className="w-full py-3 rounded-full font-medium text-base bg-transparent border border-[#404040] text-[#cccccc] transition hover:bg-[#2d2d2d]"
              onClick={goBack}
            >
              Go back
            </button>
            {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
          </form>
        </div>
        {/* Terms of service */}
        <div className="absolute bottom-6 text-xs text-gray-500 text-center w-full">
          <p>
            By continuing, you agree to Krupixi's{" "}
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300 border-b border-transparent hover:border-blue-300"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300 border-b border-transparent hover:border-blue-300"
            >
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
  );
};

export default ProfileStep;
