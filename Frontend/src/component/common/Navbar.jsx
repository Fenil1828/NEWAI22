import logo from "../../assets/kw.png"
import { IoSettingsOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { useNavigate } from "react-router-dom";


const Navbar = () => {

    const navigate = useNavigate()

    return(
        <div className="h-[60px]  border-white flex justify-between">
            <div>
                <img src={logo} alt="K Logo" 
                 height={38}
                 width={38}
                 className="ml-5 mt-3"
                />
            </div>

            <div className="text-white gap-4 flex justify-between mr-4">
                <button className="cursor-pointer">
                    <IoSettingsOutline
                     size={22}
                    />
                </button>


                <button onClick={() => navigate("/signup")}>
                    <div className="flex justify-between items-center gap-3 px-3 py-1 bg-amber-50 text-black rounded-4xl cursor-pointer hover:bg-white ">
                        <LuUser />
                        Sign up
                    </div>
                </button>

                <button onClick={() => navigate("/login")} >

                    <div className="border border-gray-700 px-3 py-1 rounded-4xl cursor-pointer hover:bg-stone-600">
                        Sign in
                    </div>
                    
                </button>
            </div>
        </div>
    )
}

export default Navbar





// import React, { useState } from 'react';
// import { IoSettingsOutline } from "react-icons/io5";
// import { LuUser } from "react-icons/lu";
// import { HiMenuAlt3, HiX } from "react-icons/hi";

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const navigate = (path) => {
//     console.log(`Navigate to: ${path}`);
//     setIsMobileMenuOpen(false);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <div className="h-[60px] border-white flex justify-between items-center relative bg-black">
//       {/* Logo */}
//       <div className="flex items-center">
//         <div className="ml-3 sm:ml-5 mt-1 w-9 h-9 sm:w-[38px] sm:h-[38px] bg-white rounded-full flex items-center justify-center">
//           <span className="text-black font-bold text-lg">K</span>
//         </div>
//       </div>

//       {/* Desktop Navigation */}
//       <div className="hidden md:flex text-white gap-4 mr-4 items-center">
//         <button className="cursor-pointer p-2 hover:bg-gray-800 rounded-full transition-colors">
//           <IoSettingsOutline size={22} />
//         </button>
        
//         <button onClick={() => navigate("/signup")}>
//           <div className="flex justify-between items-center gap-3 px-3 py-1 bg-amber-50 text-black rounded-full cursor-pointer hover:bg-white transition-colors">
//             <LuUser />
//             <span className="text-sm font-medium">Sign up</span>
//           </div>
//         </button>
        
//         <button onClick={() => navigate("/login")}>
//           <div className="border border-gray-700 px-3 py-1 rounded-full cursor-pointer hover:bg-stone-600 transition-colors">
//             <span className="text-sm font-medium">Sign in</span>
//           </div>
//         </button>
//       </div>

//       {/* Mobile Hamburger Menu */}
//       <div className="md:hidden mr-3">
//         <button
//           onClick={toggleMobileMenu}
//           className="text-white p-2 hover:bg-gray-800 rounded-full transition-colors"
//         >
//           {isMobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu Overlay */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm md:hidden">
//           <div className="flex flex-col h-full">
//             {/* Mobile Menu Header */}
//             <div className="flex justify-between items-center p-4 border-b border-gray-800">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
//                   <span className="text-black font-bold">K</span>
//                 </div>
//                 <span className="text-white font-semibold text-lg">Krupixi</span>
//               </div>
//               <button
//                 onClick={toggleMobileMenu}
//                 className="text-white p-2 hover:bg-gray-800 rounded-full transition-colors"
//               >
//                 <HiX size={24} />
//               </button>
//             </div>

//             {/* Mobile Menu Items */}
//             <div className="flex-1 flex flex-col justify-center px-6 space-y-6">
//               <button
//                 onClick={() => navigate("/signup")}
//                 className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-amber-50 text-black rounded-2xl hover:bg-white transition-colors text-lg font-medium"
//               >
//                 <LuUser size={20} />
//                 Sign up
//               </button>
              
//               <button
//                 onClick={() => navigate("/login")}
//                 className="w-full border border-gray-700 px-6 py-4 rounded-2xl hover:bg-stone-600 transition-colors text-white text-lg font-medium"
//               >
//                 Sign in
//               </button>
              
//               <button
//                 onClick={() => {
//                   console.log("Settings clicked");
//                   setIsMobileMenuOpen(false);
//                 }}
//                 className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gray-800 text-white rounded-2xl hover:bg-gray-700 transition-colors text-lg font-medium"
//               >
//                 <IoSettingsOutline size={20} />
//                 Settings
//               </button>
//             </div>

//             {/* Mobile Menu Footer */}
//             <div className="p-6 border-t border-gray-800">
//               <p className="text-gray-400 text-center text-sm">
//                 Welcome to Krupixi AI
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;