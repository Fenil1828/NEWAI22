// // // // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // // // import axios from 'axios';

// // // // // Async thunk for initiating Google login
// // // // export const initiateGoogleLogin = createAsyncThunk(
// // // //   'auth/initiateGoogleLogin',
// // // //   async (_, { rejectWithValue }) => {
// // // //     try {
// // // //       const response = await axios.get('http://localhost:3000/api/auth/google', {
// // // //         withCredentials: true,
// // // //       });
// // // //       window.location.href = response.data.url; // Redirect to Google auth
// // // //       return response.data.url;
// // // //     } catch (error) {
// // // //       return rejectWithValue(error.response?.data?.error || 'Failed to initiate Google login');
// // // //     }
// // // //   }
// // // // );

// // // // // Async thunk for fetching user data
// // // // export const fetchUser = createAsyncThunk(
// // // //   'auth/fetchUser',
// // // //   async (_, { rejectWithValue }) => {
// // // //     try {
// // // //       const response = await axios.get('http://localhost:3000/api/auth/user', {
// // // //         withCredentials: true,
// // // //       });
// // // //       return response.data.user;
// // // //     } catch (error) {
// // // //       return rejectWithValue(error.response?.data?.error || 'Failed to fetch user');
// // // //     }
// // // //   }
// // // // );

// // // // // Async thunk for logout
// // // // export const logout = createAsyncThunk(
// // // //   'auth/logout',
// // // //   async (_, { rejectWithValue }) => {
// // // //     try {
// // // //       await axios.post('http://localhost:3000/api/auth/logout', {}, {
// // // //         withCredentials: true,
// // // //       });
// // // //       return null;
// // // //     } catch (error) {
// // // //       return rejectWithValue(error.response?.data?.error || 'Failed to logout');
// // // //     }
// // // //   }
// // // // );

// // // // const authSlice = createSlice({
// // // //   name: 'auth',
// // // //   initialState: {
// // // //     user: null,
// // // //     loading: false,
// // // //     error: null,
// // // //   },
// // // //   reducers: {
// // // //     clearError(state) {
// // // //       state.error = null;
// // // //     },
// // // //   },
// // // //   extraReducers: (builder) => {
// // // //     // Initiate Google Login
// // // //     builder
// // // //       .addCase(initiateGoogleLogin.pending, (state) => {
// // // //         state.loading = true;
// // // //         state.error = null;
// // // //       })
// // // //       .addCase(initiateGoogleLogin.fulfilled, (state) => {
// // // //         state.loading = false;
// // // //       })
// // // //       .addCase(initiateGoogleLogin.rejected, (state, action) => {
// // // //         state.loading = false;
// // // //         state.error = action.payload;
// // // //       });

// // // //     // Fetch User
// // // //     builder
// // // //       .addCase(fetchUser.pending, (state) => {
// // // //         state.loading = true;
// // // //         state.error = null;
// // // //       })
// // // //       .addCase(fetchUser.fulfilled, (state, action) => {
// // // //         state.loading = false;
// // // //         state.user = action.payload
// // // //           ? {
// // // //               ...action.payload,
// // // //               image: action.payload.picture || 
// // // //                 `https://api.dicebear.com/5.x/initials/svg?seed=${action.payload.firstName} ${action.payload.lastName}`,
// // // //             }
// // // //           : null;
// // // //       })
// // // //       .addCase(fetchUser.rejected, (state, action) => {
// // // //         state.loading = false;
// // // //         state.error = action.payload;
// // // //       });

// // // //     // Logout
// // // //     builder
// // // //       .addCase(logout.pending, (state) => {
// // // //         state.loading = true;
// // // //         state.error = null;
// // // //       })
// // // //       .addCase(logout.fulfilled, (state) => {
// // // //         state.loading = false;
// // // //         state.user = null;
// // // //       })
// // // //       .addCase(logout.rejected, (state, action) => {
// // // //         state.loading = false;
// // // //         state.error = action.payload;
// // // //       });
// // // //   },
// // // // });

// // // // export const { clearError } = authSlice.actions;
// // // // export default authSlice.reducer;

// // // import { createSlice } from '@reduxjs/toolkit';

// // // const authSlice = createSlice({
// // //   name: 'auth',
// // //   initialState: {
// // //     token: null,
// // //     user: null,
// // //   },
// // //   reducers: {
// // //     setAuth: (state, action) => {
// // //       state.token = action.payload.token;
// // //       state.user = action.payload.user;
// // //     },
// // //     clearAuth: (state) => {
// // //       state.token = null;
// // //       state.user = null;
// // //     },
// // //   },
// // // });

// // // export const { setAuth, clearAuth } = authSlice.actions;
// // // export default authSlice.reducer;

// // // src/redux/slices/authSlice.js
// // import { createSlice } from "@reduxjs/toolkit";

// // const initialState = {
// //   token: null,
// //   user: null,
// //   loading: false,
// // };

// // const authSlice = createSlice({
// //   name: "auth",
// //   initialState,
// //   reducers: {
// //     setToken: (state, action) => {
// //       state.token = action.payload;
// //     },
// //     setUser: (state, action) => {
// //       state.user = action.payload;
// //     },
// //     setLoading: (state, action) => {
// //       state.loading = action.payload;
// //     },
// //     logout: (state) => {
// //       state.token = null;
// //       state.user = null;
// //       state.loading = false;
// //     },
// //   },
// // });

// // export const { setToken, setUser, setLoading, logout } = authSlice.actions;
// // export default authSlice.reducer;

// // src/redux/slices/authSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// // Read from localStorage, or fallback to null
// const token = JSON.parse(localStorage.getItem("token"));
// const user = JSON.parse(localStorage.getItem("user"));

// console.log("token is : " , token)
// console.log("user is  : " , user)

// const initialState = {
//   token: token || null,
//   user: user || null,
//   loading: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setToken: (state, action) => {
//       state.token = action.payload;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     logout: (state) => {
//       state.token = null;
//       state.user = null;
//       state.loading = false;
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//     },
//   },
// });

// export const { setToken, setUser, setLoading, logout } = authSlice.actions;
// export default authSlice.reducer;

// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Read from localStorage, or fallback to null
const token = JSON.parse(localStorage.getItem("token"));
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  token: token || null,
  user: user || null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.loading = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setToken, setUser, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;
