import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();
    const [message, setMessage] = useState({ type: "", text: "" });
    const [loading, setLoading] = useState(false);

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

    async function handleSubmit(e) {
        e.preventDefault();

        if (!user.name || !user.email || !user.password) {
            setMessage({ type: "error", text: "Please fill all the fields." });
            return;
        }

        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            // Check if email already exists
            const res = await api.get(`/users?email=${user.email}`);
            const existingUsers = res.data;

            if (existingUsers.length > 0) {
                setMessage({ type: "error", text: "This email is already registered." });
                setLoading(false);
                return;
            }

            // Register new user
            const newUser = {
                id: Date.now().toString(),
                name: user.name,
                email: user.email,
                password: user.password
            };

            await api.post("/users", newUser);

            setMessage({ type: "success", text: "Registered successfully! Redirecting to login..." });

            setTimeout(() => {
                navigate("/login");
            }, 1200);

        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: "Registration failed. Please try again." });
        } finally {
            setLoading(false);
        }
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
                        disabled={loading}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <button disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
