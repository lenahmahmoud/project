import "../style/signup.css";
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';

export default function Signup() {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phonenumber, setPhonenumber] = useState('')
  const [confirm, setConfirm] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);

    if (password !== confirm) {
      setErr("Passwords do not match");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setErr("Password must be at least 6 characters")
      setLoading(false);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErr("invalid email address")
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/signup', {
        firstname,
        lastname,
        username,
        phonenumber,
        email,
        password,
      });

      if (res.data.success) {
        const token = res.data.token;

        Swal.fire({
          icon: "success",
          title: "Your account has been created successfully!",
          showConfirmButton: false,
          timer: 1500
        });

        navigate("/login");
      } else {
        setErr(res.data.error || "Signup failed");
      }

    } catch (error) {
      setErr(error.response?.data?.error || "Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-card">
      <div className="text-center mb-3">
        <h2>Sign up</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row field-grid">
          <div className="col-md-6 mb-3">
            <label className="form-label">First Name</label>
            <input
              className="form-control"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Last Name</label>
            <input
              className="form-control"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Phone Number</label>
            <input
              className="form-control"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              required
            />
          </div>

        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
        </div>

        {err && <div className="alert alert-danger py-2">{err}</div>}

        <button className="btn signup-cta w-100" type="submit" disabled={loading}>
          {loading ? '...loading' : 'Sign up'}
        </button>

        <div className="text-center mt-3 small-muted">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
