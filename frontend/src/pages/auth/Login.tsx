import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            setLoading(true);
            setMessage("");

            const data = await loginUser(email, password);

            login(data.token, data.user);

            navigate("/dashboard");
        } catch (error: any) {
            setMessage(
                error.response?.data?.message ||
                "Unable to sign in. Please check your credentials."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="nexora-login">

            {/* LEFT SIDE */}
            <section className="brand-panel">
                <div className="brand-content">

                    <div className="logo">
                        <div className="logo-icon">N</div>
                        <span>NEXORA</span>
                    </div>

                    <div className="hero-text">
                        <p className="eyebrow">ERP • CRM • OPERATIONS</p>

                        <h1>
                            Everything your business needs.
                            <span> One intelligent workspace.</span>
                        </h1>

                        <p className="hero-description">
                            Manage customers, inventory, products, stock movements
                            and sales operations from one powerful platform.
                        </p>
                    </div>

                    <div className="feature-grid">
                        <div className="feature">
                            <span className="feature-icon">◈</span>
                            <div>
                                <strong>Customers</strong>
                                <small>CRM Management</small>
                            </div>
                        </div>

                        <div className="feature">
                            <span className="feature-icon">◫</span>
                            <div>
                                <strong>Inventory</strong>
                                <small>Stock Control</small>
                            </div>
                        </div>

                        <div className="feature">
                            <span className="feature-icon">↗</span>
                            <div>
                                <strong>Sales</strong>
                                <small>Challan Management</small>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="background-orb orb-one"></div>
                <div className="background-orb orb-two"></div>
                <div className="grid-lines"></div>
            </section>

            {/* RIGHT SIDE */}
            <section className="login-panel">
                <div className="login-container">

                    <div className="mobile-logo">
                        <div className="logo-icon">N</div>
                        <span>NEXORA</span>
                    </div>

                    <div className="login-title">
                        <p className="login-tag">WELCOME BACK</p>
                        <h2>Sign in to your workspace</h2>
                        <p>
                            Enter your credentials to continue managing your operations.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="input-wrapper">
                            <label>Email address</label>

                            <div className="input-box">
                                <span className="input-icon">@</span>

                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-wrapper">
                            <div className="password-label">
                                <label>Password</label>
                                <button type="button">Forgot password?</button>
                            </div>

                            <div className="input-box">
                                <span className="input-icon">●</span>

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {message && (
                            <div className="error-message">
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="submit-button"
                        >
                            <span>
                                {loading ? "Signing in..." : "Sign in to NEXORA"}
                            </span>
                            {!loading && <b>→</b>}
                        </button>

                    </form>

                    <div className="security-note">
                        <span>✦</span>
                        Protected workspace · Authorized employees only
                    </div>

                </div>
            </section>

        </div>
    );
};

export default Login;