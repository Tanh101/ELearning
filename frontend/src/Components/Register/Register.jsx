import "./register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            password: password,
            role: role,
        };
        registerUser(newUser, dispatch, navigate);
    };
    const handleChange = (e) => {
        setRole(e.target.value);
    };
    return (
        <section className="register-container">
            <div className="register-title"> Sign up </div>
            <form onSubmit={handleRegister}>
                <label>USERNAME</label>
                <input
                    type="text" placeholder="Enter your username"
                    onChange={(e) => setUsername(e.target.value)}

                />
                <label>PASSWORD</label>
                <input type="password" placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)} />
                <label>Role</label>
                <select onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                    <option value="shipper">Shipper</option>
                </select>
                <button type="submit"> Create account </button>
            </form>
        </section>

    );
}

export default Register;