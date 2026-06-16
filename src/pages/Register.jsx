import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { findUserByEmail, getRegisteredUsers, saveRegisteredUsers } from "../utils/auth";

function Register() {
    const navigate = useNavigate();
    const [message, setMessage] = useState({ type: "", text: "" });

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!user.name || !user.email || !user.password) {
            setMessage({ type: "error", text: "Please fill all the fields." });
            return;
        }

        if (findUserByEmail(user.email)) {
            setMessage({ type: "error", text: "This email is already registered." });
            return;
        }

        const newUser = {
            id: Date.now().toString(),
            ...user
        };

        const users = getRegisteredUsers();
        saveRegisteredUsers([...users, newUser]);
        setMessage({ type: "success", text: "Registered successfully. Please login." });

        setTimeout(() => {
            navigate("/login");
        }, 900);
    }

    return (
        <div className='auth-container'>
            <div className='auth-card'>
                <h1>Create Account</h1>

                {message.text && (
                    <p className={`form-message ${message.type}`}>
                        {message.text}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={user.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    <button>Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
