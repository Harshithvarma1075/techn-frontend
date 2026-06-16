import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRegisteredUsers } from "../utils/auth";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });

    function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) {
            setMessage({ type: "error", text: "Please enter email and password." });
            return;
        }

        const users = getRegisteredUsers();
        const matchedUser = users.find(
            user =>
                user.email.toLowerCase() === email.toLowerCase() &&
                user.password === password
        );

        if (matchedUser) {
            localStorage.setItem(
                "user",
                JSON.stringify(matchedUser)
            );

            setMessage({ type: "success", text: "Login successful. Redirecting..." });

            setTimeout(() => {
                navigate("/");
                window.location.reload();
            }, 700);
        } else {
            setMessage({ type: "error", text: "Login failed. Check your credentials." });
        }
    }

    return (
        <div className='auth-container'>
            <div className='auth-card'>
                <h1>Login</h1>

                {message.text && (
                    <p className={`form-message ${message.type}`}>
                        {message.text}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
