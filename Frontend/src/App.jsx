// import './App.css'
// import SignUp from './component/auth/SignUpFLow/SignUp'


// import { Route,Routes } from "react-router-dom";
// import EmailStep from './component/auth/SignUpFLow/EmailStep'
// import OtpStep from './component/auth/SignUpFLow/OtpStep'
// import ProfileStep from './component/auth/SignUpFLow/ProfileStep'
// import AuthSuccess from '../Apis/AuthSuccess';
// import Navbar from './component/common/Navbar';
// import Login from './component/auth/SignUpFLow/Login';

// function App() {
//   return (
//     <>
     
//      <div className='w-screen min-h-screen flex flex-col bg-neutral-900'>
      
//       <div>
//         <Navbar />
//       </div>
      
//       <Routes>
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/signup/email" element={<EmailStep />} />
//         <Route path="/signup/otp" element={<OtpStep />} />
//         <Route path="/signup/profile" element={<ProfileStep />} />

//          <Route path="/login" element={<Login />} />
//         <Route path="/auth/success" element={<AuthSuccess />} />
//       </Routes>
//      </div>


//     </>
//   )
// }

// export default App

import './App.css'
import SignUp from './component/auth/SignUpFLow/SignUp'
import { Route, Routes, useLocation } from "react-router-dom";
import EmailStep from './component/auth/SignUpFLow/EmailStep'
import OtpStep from './component/auth/SignUpFLow/OtpStep'
import ProfileStep from './component/auth/SignUpFLow/ProfileStep'
import AuthSuccess from '../Apis/AuthSuccess';
import Navbar from './component/common/Navbar';
import Login from './component/auth/SignUpFLow/Login';
import Home from './Pages/Home';
import UserHome from './Pages/UserHome';
import Sidebar from './component/common/Sidebar';
import LoginPs from './component/auth/SignUpFLow/LoginPs';

function App() {
  const location = useLocation();


  // useEffect(() => {
  //   if(localStorage.getItem("token")){
  //     const token = JSON.parse(localStorage.getItem("token"))
  //     dispatch(getUserDetails(token,navigate ))
  //   }
  // }, [])

  // List all routes where you want to hide the navbar
  const hideNavbarRoutes = [
    "/signup",
    "/signup/email",
    "/signup/otp",
    "/signup/profile",
    "/login",
    '/krupixi',
    '/sidebar',
    '/login/user'
  ];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className='w-screen min-h-screen flex flex-col bg-neutral-900'>
      {/* Conditionally render Navbar */}
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route  path='/sidebar' element={<Sidebar/>} />
        <Route path='/krupixi' element={<UserHome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/login/user' element={<LoginPs/>} />
        <Route path="/signup/email" element={<EmailStep />} />
        <Route path="/signup/otp" element={<OtpStep />} />
        <Route path="/signup/profile" element={<ProfileStep />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
      </Routes>
    </div>
  )
}

export default App;
