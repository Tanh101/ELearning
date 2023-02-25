import { useEffect } from "react";
import "./home.css";
import { deleteUser, getAllUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { loginSuccess } from "../../redux/authSlice";

const HomePage = () => {

  let axiosJWT = axios.create();

  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users.users?.allUsers);
  const msg = useSelector((state) => state.users?.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    deleteUser(id, user?.accessToken, dispatch);
  };

  axiosJWT.interceptors.request.use(

    async (config) => {
      const decodeToken = jwt_decode(user?.accessToken);
      if(decodeToken.exp * 1000 < new Date().getTime()) {
        const res = await axios.post("/api/auth/refresh", {
          withCredentials: true,
        });
        const refreshUser = {
          ...user,
          accessToken: res.data.accessToken
        }
        dispatch(loginSuccess(refreshUser));
        config.headers.token = "Bearer " + res.data.accessToken;

      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      getAllUser(user?.accessToken, dispatch);
    }
  }, []);


  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-userlist">
        {userList?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div className="delete-user" onClick={() => handleDelete(user._id)}> Delete </div>
            </div>
          );
        })}
        <div className="error_message">{msg}</div>
      </div>



    </main>
  );
};

export default HomePage;
