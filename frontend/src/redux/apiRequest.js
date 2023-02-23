import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerStart, registerSuccess, registerFailed } from "./authSlice";


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
