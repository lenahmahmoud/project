import '../style/Login.css';
import { useState } from "react";
import { useNavigate ,Link } from "react-router-dom";
import { loginUser } from "../../../utils/Api";
import Swal from 'sweetalert2';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const user = await loginUser({ email, password });

      // Simulate login and save to localStorage
      localStorage.setItem("token", "fake-jwt-token");
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/home");
      Swal.fire({
        icon: "success",
        title: "Login successful!",
        showConfirmButton: false,
        timer: 1500
      });

      navigate("/home"); // Navigate to home
    } catch (error) {
      const message = typeof error === "string" ? error : (error?.message || "Something went wrong");
      setErr(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="text-center mb-4">
        <div className="auth-logo"></div>
        <h3 className="mt-2">Login</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {err && <div className="alert alert-danger py-2">{err}</div>}

        <button type="submit" className="btn login-cta w-100 mb-2" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>

        <div className="text-center small-muted">
          Forgot your password? <Link to="#">Reset it here</Link>.
        </div>

        <hr />

        <div className="text-center small-muted mt-2">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
}