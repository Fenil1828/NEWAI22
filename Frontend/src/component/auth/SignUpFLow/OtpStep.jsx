// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const OtpStep = () => {

//   const [otp, setOtp] = useState(new Array(6).fill(''));
//   const otpRefs = useRef([]);

//   const navigate = useNavigate();

//    // Try to get email from location.state, fallback to sessionStorage
//   const email = location.state?.email || sessionStorage.getItem("signupEmail") || "";

//   useEffect(() => {
//     // Focus on first input when component mounts
//     if (!email) {
//       navigate("/signup");
//     }
//     if (otpRefs.current[0]) {
//       otpRefs.current[0].focus();
//     }
//   }, [email, navigate]);

//   const handleChange = (value, index) => {
//     if (isNaN(value)) return;
    
//     const newOtp = [...otp];
//     newOtp[index] = value.substring(value.length - 1);
//     setOtp(newOtp);

//     // Move to next input if current field is filled
//     if (value && index < 5 && otpRefs.current[index + 1]) {
//       otpRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (key, index) => {
//     if (key === 'Backspace' && !otp[index] && index > 0 && otpRefs.current[index - 1]) {
//       otpRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pasteData = e.clipboardData.getData('text');
//     const pasteValues = pasteData.replace(/\D/g, '').slice(0, 6).split('');
    
//     const newOtp = [...otp];
//     pasteValues.forEach((value, index) => {
//       if (index < 6) {
//         newOtp[index] = value;
//       }
//     });
    
//     setOtp(newOtp);
    
//     // Focus on the last filled input or the next empty one
//     const lastIndex = Math.min(pasteValues.length - 1, 5);
//     if (otpRefs.current[lastIndex]) {
//       otpRefs.current[lastIndex].focus();
//     }
//   };

//   const confirmEmail = () => {
//     const otpValue = otp.join('');
//     if (otpValue.length === 6) {
//       // Add your confirmation logic here
//        navigate("/signup/profile")
//     } else {
//       alert('Please enter the complete 6-digit code');
//     }
//   };

//   const goBack = () => {
//     // Add your go back logic here
//     console.log('Going back...');
//     // window.history.back();
//   };
//   return (
//      <form className="h-screen overflow-hidden" >

//         <div className="flex h-screen overflow-hidden">
//       {/* Left side with form */}
//       <div className="relative w-1/2 flex flex-col items-center justify-center bg-black text-white p-8 shadow-2xl shadow-gray-800 relative backdrop-blur-lg">

//         <div className="absolute top-5 right-8 flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-xl border border-gray-500/50 rounded-2xl shadow-lg hover:border-gray-600/50 transition-all duration-300 group">
//           <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
//           <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">
//             You are signing into Krupixi
//           </span>
//         </div>

//          <div className="min-h-screen bg-black flex items-center justify-center p-5">
//       <div className="w-full max-w-md text-center">
//         {/* Title */}
//         <h1 className="text-3xl font-semibold text-white mb-6">
//           Verify your email
//         </h1>
        
//         {/* Subtitle */}
//         <div className="text-gray-400 text-base mb-1 leading-relaxed">
//           We've emailed a one time security code to
//         </div>
        
//         {/* Email */}
//         <div className="text-white font-medium mb-12">
//           {email} , please enter it below:
//         </div>
       
        
//         {/* OTP Input Container */}
//         <div className="flex justify-center items-center gap-4 mb-15">
//           {/* First 3 digits */}
//           <div className="flex gap-2">
//             {otp.slice(0, 3).map((digit, index) => (
//               <input
//                 key={index}
//                 ref={(el) => (otpRefs.current[index] = el)}
//                 type="text"
//                 maxLength="1"
//                 value={digit}
//                 onChange={(e) => handleChange(e.target.value, index)}
//                 onKeyDown={(e) => handleKeyDown(e.key, index)}
//                 onPaste={handlePaste}
//                 className={`w-12 h-12 bg-gray-900 border-2 rounded-lg text-white text-xl font-semibold text-center outline-none transition-all duration-300 transform ${
//                   digit 
//                     ? 'border-blue-500 bg-blue-900/20 scale-105 shadow-lg shadow-blue-500/25' 
//                     : 'border-gray-700 hover:border-gray-600 focus:border-blue-500 focus:bg-gray-800'
//                 }`}
//               />
//             ))}
//           </div>
          
//           {/* Separator */}
//           <div className="text-gray-500 text-2xl font-light">—</div>
          
//           {/* Last 3 digits */}
//           <div className="flex gap-2">
//             {otp.slice(3, 6).map((digit, index) => (
//               <input
//                 key={index + 3}
//                 ref={(el) => (otpRefs.current[index + 3] = el)}
//                 type="text"
//                 maxLength="1"
//                 value={digit}
//                 onChange={(e) => handleChange(e.target.value, index + 3)}
//                 onKeyDown={(e) => handleKeyDown(e.key, index + 3)}
//                 onPaste={handlePaste}
//                 className={`w-12 h-12 bg-gray-900 border-2 rounded-lg text-white text-xl font-semibold text-center outline-none transition-all duration-300 transform ${
//                   digit 
//                     ? 'border-blue-500 bg-blue-900/20 scale-105 shadow-lg shadow-blue-500/25' 
//                     : 'border-gray-700 hover:border-gray-600 focus:border-blue-500 focus:bg-gray-800'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
        
//         {/* Confirm Button */}
//         <button
//           onClick={confirmEmail}
//           className="w-full py-4 px-6 bg-white text-black border-none rounded-full text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-100 hover:-translate-y-0.5 active:translate-y-0 mb-4"
//         >
//           Confirm email
//         </button>
        
//         {/* Go Back Button */}
//         <button
//           onClick={goBack}
//           className="w-full py-4 px-6 bg-transparent text-white border-2 border-gray-700 rounded-full text-base font-semibold cursor-pointer transition-all duration-300 hover:border-gray-600 hover:bg-gray-900 active:translate-y-0.5"
//         >
//           Go back
//         </button>
//       </div>
//     </div>
                 

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

// export default OtpStep




import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OtpStep = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const otpRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Try to get email from location.state, fallback to sessionStorage
  const email = location.state?.email || sessionStorage.getItem("signupEmail") || "";

  useEffect(() => {
    // Focus on first input when component mounts
    if (!email) {
      navigate("/signup");
    }
    if (otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  }, [email, navigate]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (value && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (key, index) => {
    if (key === "Backspace" && !otp[index] && index > 0 && otpRefs.current[index - 1]) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const pasteValues = pasteData.replace(/\D/g, "").slice(0, 6).split("");

    const newOtp = [...otp];
    pasteValues.forEach((value, idx) => {
      if (idx < 6) {
        newOtp[idx] = value;
      }
    });

    setOtp(newOtp);

    // Focus on the last filled input or the next empty one
    const lastIndex = Math.min(pasteValues.length - 1, 5);
    if (otpRefs.current[lastIndex]) {
      otpRefs.current[lastIndex].focus();
    }
  };

  const confirmEmail = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      // Add your confirmation logic here
      navigate("/signup/profile");
    } else {
      alert("Please enter the complete 6-digit code");
    }
  };

  const goBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <form className="min-h-screen">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left side with form */}
        <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center bg-black text-white p-8 shadow-2xl shadow-gray-800 backdrop-blur-lg min-h-screen">
          <div className="absolute top-5 right-8 flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-xl border border-gray-500/50 rounded-2xl shadow-lg hover:border-gray-600/50 transition-all duration-300 group">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">
              You are signing into Krupixi
            </span>
          </div>

          <div className="w-full max-w-md text-center">
            {/* Title */}
            <h1 className="text-3xl font-semibold text-white mb-6">
              Verify your email
            </h1>

            {/* Subtitle */}
            <div className="text-gray-400 text-base mb-1 leading-relaxed">
              We've emailed a one time security code to
            </div>

            {/* Email */}
            <div className="text-white font-medium mb-12 break-all">
              {email}, please enter it below:
            </div>

            {/* OTP Input Container */}
            <div className="flex justify-center items-center gap-4 mb-12">
              {/* First 3 digits */}
              <div className="flex gap-2">
                {otp.slice(0, 3).map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e.key, index)}
                    onPaste={handlePaste}
                    className={`w-12 h-12 bg-gray-900 border-2 rounded-lg text-white text-xl font-semibold text-center outline-none transition-all duration-300 transform ${
                      digit
                        ? "border-blue-500 bg-blue-900/20 scale-105 shadow-lg shadow-blue-500/25"
                        : "border-gray-700 hover:border-gray-600 focus:border-blue-500 focus:bg-gray-800"
                    }`}
                  />
                ))}
              </div>

              {/* Separator */}
              <div className="text-gray-500 text-2xl font-light">—</div>

              {/* Last 3 digits */}
              <div className="flex gap-2">
                {otp.slice(3, 6).map((digit, index) => (
                  <input
                    key={index + 3}
                    ref={(el) => (otpRefs.current[index + 3] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index + 3)}
                    onKeyDown={(e) => handleKeyDown(e.key, index + 3)}
                    onPaste={handlePaste}
                    className={`w-12 h-12 bg-gray-900 border-2 rounded-lg text-white text-xl font-semibold text-center outline-none transition-all duration-300 transform ${
                      digit
                        ? "border-blue-500 bg-blue-900/20 scale-105 shadow-lg shadow-blue-500/25"
                        : "border-gray-700 hover:border-gray-600 focus:border-blue-500 focus:bg-gray-800"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={confirmEmail}
              className="w-full py-4 px-6 bg-white text-black border-none rounded-full text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-100 hover:-translate-y-0.5 active:translate-y-0 mb-4"
              type="submit"
            >
              Confirm email
            </button>

            {/* Go Back Button */}
            <button
              onClick={goBack}
              className="w-full py-4 px-6 bg-transparent text-white border-2 border-gray-700 rounded-full text-base font-semibold cursor-pointer transition-all duration-300 hover:border-gray-600 hover:bg-gray-900 active:translate-y-0.5"
              type="button"
            >
              Go back
            </button>
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
            <svg
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-white opacity-10"
            >
              <path
                fill="currentColor"
                d="M200,0 C310.457,0 400,89.543 400,200 C400,310.457 310.457,400 200,400 C89.543,400 0,310.457 0,200 C0,89.543 89.543,0 200,0 Z M200,40 C111.634,40 40,111.634 40,200 C40,288.366 111.634,360 200,360 C288.366,360 360,288.366 360,200 C360,111.634 288.366,40 200,40 Z"
              ></path>
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
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/400x400/000000/FFFFFF?text=K";
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default OtpStep;
