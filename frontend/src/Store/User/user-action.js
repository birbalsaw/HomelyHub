import axios from "axios";
import { userActions } from "./user-slice";

// handle user sign up
export const getSignUp = (user) => async (dispatch) => {
  try {
    dispatch(userActions.getSignupRequest());
    const { data } = await axios.post("/api/v1/rent/user/signup", user);

    dispatch(userActions.getSignupDetails(data.user));
  } catch (error) {
    dispatch(userActions.getError(error.response.data.message));
  }
};

// handle for user login
export const getLogIn = (user) => async(dispatch) => {
  try {
    dispatch(userActions.getLoginRequest());
    const { data } = await axios.post("/api/v1/rent/user/login", user);
    dispatch(userActions.getLoginDetails(data.user))
  } catch (error) {
    dispatch(userActions.getError(error.response.data.message));
  }
};

// to get current user information
export const currentUser = () => async(dispatch) => {
  try {
    dispatch(userActions.getCurrentUserRequest());
    const { data } = await axios.get("/api/v1/rent/user/me");
    dispatch(userActions.getCurrentUser(data.user));
  } catch (error) {
    dispatch(userActions.getError(error.response.data.message));
  }
};

// to update user information

export const updateUser = (updateUser) => async (dispatch) => {
  try {
    dispatch(userActions.getUpdateUserRequest());
    await axios.patch("/api/v1/rent/user/updateme", updateUser);
    const { data } = await axios.get("/api/v1/rent/user/me");
    dispatch(userActions.getCurrentUser(data.user));
  } catch (error) {
    dispatch(userActions.getError(error.response.data.message));
  }
};

// to handle forgot Password

export const forgotPassword = (email) => async (dispatch) => {
  try {
    await axios.post("/api/v1/rent/user/forgotPassword", { email });
  } catch (error) {
    dispatch(userActions.getError(error.response.data.message));
  }
};

// handle for Password Reset

export const resetPassword = (repassword, token) => async (dispatch) => {
  try {
    await axios.patch(`/api/v1/rent/user/resetPassword/${token}`, repassword);
  } catch (error) {
    dispatch(userActions.getError(error.response.data.message));
  }
};

// password Update
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch(userActions.getPasswordRequest());
    await axios.patch("/api/v1/rent/user/updateMyPassword", passwords);
    dispatch(userActions.getPasswordSuccess(true));
  } catch (error) {
    dispatch(userActions.getError(error.response.data.message));
  }
};

// user LogOut

export const Logout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/rent/user/logout");
    dispatch(userActions.getLogout(null));
  } catch (error) {
    dispatch(userActions.getError(error));
  }
};
