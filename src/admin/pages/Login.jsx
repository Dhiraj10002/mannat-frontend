import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { Helmet } from "react-helmet-async";
import adminApi from "../services/api";
import logo from "../../assets/images/logo.png";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (loading) return;
    setErrorMsg("");
    setLoading(true);
    try {
      const res = await adminApi.post("/auth/login", {
        email: email.trim().toLowerCase(),
        password,
      });
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin");
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || err.response?.data?.error ||
        "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login">
      <Helmet>
        <title>Admin Sign In | Mannat Foundation</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="admin-login__layout">
        <section className="admin-login__story" aria-label="Mannat Foundation">
          <Link to="/" className="admin-login__brand">
            <img src={logo} alt="" width="44" height="44" />
            <span>Mannat <span>Foundation</span></span>
          </Link>
          <div className="admin-login__story-copy">
            <span className="admin-login__eyebrow">Care. Connect. Create change.</span>
            <h2>Small acts.<br />Lasting impact.</h2>
            <p>Behind every initiative is a team making a difference. This is where your work comes together.</p>
          </div>
          <span className="admin-login__story-footer">Working together for a better tomorrow.</span>
        </section>

        <section className="admin-login__form-panel" aria-labelledby="admin-login-title">
          <Link to="/" className="admin-login__back"><FiArrowLeft aria-hidden="true" /> Back to website</Link>
          <div className="admin-login__intro">
            <span className="admin-login__lock"><FiLock aria-hidden="true" /></span>
            <span className="admin-login__eyebrow">Admin portal</span>
            <h1 id="admin-login-title">Welcome back</h1>
            <p>Sign in to manage your foundation’s work.</p>
          </div>
          {errorMsg && <div className="admin-login__error" role="alert" id="login-error">{errorMsg}</div>}
          <form onSubmit={handleLogin} className="admin-login__form" aria-busy={loading}>
            <div>
              <label htmlFor="admin-email">Email address</label>
              <div className="admin-login__field">
                <FiMail aria-hidden="true" />
                <input id="admin-email" name="email" type="email" placeholder="you@example.com"
                  value={email} required autoComplete="username" disabled={loading}
                  aria-describedby={errorMsg ? "login-error" : undefined}
                  onChange={(event) => setEmail(event.target.value)} />
              </div>
            </div>
            <div>
              <label htmlFor="admin-password">Password</label>
              <div className="admin-login__field">
                <FiLock aria-hidden="true" />
                <input id="admin-password" name="password" type={showPassword ? "text" : "password"}
                  placeholder="Enter your password" value={password} required autoComplete="current-password"
                  disabled={loading} onChange={(event) => setPassword(event.target.value)} />
                <button type="button" className="admin-login__password-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword} onClick={() => setShowPassword((show) => !show)}>
                  {showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="admin-login__submit">
              <span>{loading ? "Signing in…" : "Sign in"}</span>
              {!loading && <FiArrowRight aria-hidden="true" />}
            </button>
          </form>
          <p className="admin-login__note">For authorized Mannat Foundation administrators.</p>
        </section>
      </div>
    </main>
  );
}
