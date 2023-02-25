import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerStart, registerSuccess, registerFailed } from "./authSlice";
import { getUserStart, getUserSuccess, getUserFailed, deleteUserStart, deleteUserSuccess, deleteUserFailed } from "./userSlice";


export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/api/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (error) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post("/api/auth/register", user);
        dispatch(registerSuccess(res.data));
        navigate("/login");
    } catch (error) {
        dispatch(registerFailed());
    }
}

export const getAllUser = async (accessToken, dispatch) => {
    dispatch(getUserStart());
    try {
        const res = await axios.get("/api/user", {
            headers: {
                token: "Bearer " + accessToken
            }
        });
        dispatch(getUserSuccess(res.data));
    } catch (error) {
        dispatch(getUserFailed());
    }
}

export const deleteUser = async (id, accessToken, dispatch) => {
    dispatch(deleteUserStart);
    try {
        const res = await axios.delete(`/api/user/${id}`, {
            headers: {
                token: "Bearer " + accessToken
            }
        });
        dispatch(deleteUserSuccess(res.data));
    }catch(error) {
        if (error.response !== undefined && error.response.data !== undefined) {
            dispatch(deleteUserFailed(error.response.data));
          }
    }
}
