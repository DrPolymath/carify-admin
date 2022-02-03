import { toast } from "react-toastify";

const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      if (action.err.code === "auth/user-not-found") {
        toast.error("Invalid Email Address");
      } else if (action.err.code === "auth/wrong-password") {
        toast.error("Incorrect Password");
      }
      return {
        ...state,
        authError: action.err.message,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        authError: null,
      };
    case "REGISTER_SUCCESS":
      toast.success("Register request send");
      return {
        ...state,
        authError: null,
      };
    case "REGISTER_ERROR":
      if (action.err.code === "auth/email-already-in-use") {
        toast.error("Email Already in Use");
      } else {
        toast.error("Register error");
      }
      return {
        ...state,
        authError: action.err.message,
      };
    case "DELETE_ACCOUNT":
      console.log("Account deleted");
      return {
        ...state,
        authError: null,
      };
    case "DELETE_ACCOUNT_ERROR":
      toast.error("Delete account error");
      console.log("delete account error");
      console.log(action);
      return {
        ...state,
        authError: action.err.message,
      };
    case "PASSWORD_RESET_EMAIL_SEND_SUCCESS":
      toast.success("Password reset email sent");
      console.log("password reset email sent");
      return {
        ...state,
        authError: null,
      };
    case "PASSWORD_RESET_EMAIL_SEND_ERROR":
      toast.error("Password reset email error");
      console.log("password reset email error");
      return {
        ...state,
        authError: action.err.message,
      };
    case "SIGNOUT_SUCCESS":
      return state;
    default:
      return state;
  }
};

export default authReducer;
