import { apiConnector } from "./apiConnector";
import { endpoints } from "./apis";

// src/redux/thunks/googleLogin.js
import { setToken, setUser, setLoading } from "../Slice/authSLice";
// import { googleLoginApi } from "../Apis/apis";
import { toast } from "react-hot-toast";

const {
 SENDOTP_API,
 PROFILE_API,
 LOGIN_API
} = endpoints

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))


      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      
      
      navigate("/krupixi")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export async function sendOtp(email) {
    try {

        const res = await apiConnector("POST" , SENDOTP_API , {email})
   
        return res.data;

    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

export async function registerUser({ email, firstName, lastName, password }) {
  try {
    const response = await apiConnector("POST", PROFILE_API, {
      email,
      firstName,
      lastName,
      password,
    });
    return response.data; // Assuming backend returns { success: true, ... }
  } catch (error) {
    // Extract error message from response if available
    const message =
      error.response?.data?.message ||
      error.message ||
      "Registration failed";
    return { success: false, message };
  }
}

// // authApis.js
// import axios from "axios";

// // Function to get Google Auth URL
// export const getGoogleAuthUrl = async () => {
//   const res = await axios.get('http://localhost:3000/api/auth/google/url', {
//     withCredentials: true
//   });
//   return res.data.url;
// };


// src/apis/authApis.js
import axios from "axios";

// export const getGoogleAuthUrl = async () => {
//   const res = await axios.get('http://localhost:3000/api/auth/google/url', {
//     withCredentials: true,
//   });
//   return res.data.url;
// };

// export const googleLoginApi = async (tokenId) => {
//   // Replace with your actual backend endpoint
//   const res = await axios.post('http://localhost:3000/api/auth/google/login', { tokenId }, { withCredentials: true });
//   return res.data;
// };


// Get Google Auth URL
export const getGoogleAuthUrl = async () => {
  const res = await axios.get('http://localhost:3000/api/auth/google/url', {
    withCredentials: true
  });
  return res.data.url;
};

// Google login API
export const googleLoginApi = async (tokenId) => {
  const res = await axios.post(
    'http://localhost:3000/api/auth/google/login',
    { tokenId },
    { withCredentials: true }
  );
  return res.data;
};


