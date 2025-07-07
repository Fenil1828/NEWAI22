// src/redux/thunks/googleLogin.js
import { setToken, setUser, setLoading } from "../Slice/authSLice";
// import { googleLoginApi } from "../../apis/authApis";
import { toast } from "react-hot-toast";
import { googleLoginApi } from "./authApi";

export function googleLogin(tokenId, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await googleLoginApi(tokenId);

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success("Google Login Successful");
      dispatch(setToken(response.token));

      // DiceBear fallback for user image
      const userImage = response.user?.image
        ? response.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.user.firstName} ${response.user.lastName}`;
      dispatch(setUser({ ...response.user, image: userImage }));

      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("GOOGLE LOGIN API ERROR............", error);
      toast.error("Google Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
