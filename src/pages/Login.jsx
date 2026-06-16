import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) {
            setMessage({ type: "error", text: "Please enter email and password." });
            return;
        }

        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            // Fetch user by email from backend
            const res = await api.get(`/users?email=${email}`);
            const users = res.data;

            const matchedUser = users.find(
                user =>
                    user.email.toLowerCase() === email.toLowerCase() &&
                    user.password === password
            );

            if (matchedUser) {
                localStorage.setItem("user", JSON.stringify(matchedUser));
                setMessage({ type: "success", text: "Login successful! Redirecting..." });

                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, 800);
            } else {
                setMessage({ type: "error", text: "Invalid email or password. Please try again." });
            }

        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: "Login failed. Server error. Please try again." });
        } finally {
            setLoading(false);
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
                        disabled={loading}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                    <button disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
