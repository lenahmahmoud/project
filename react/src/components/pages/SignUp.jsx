
import "../style/signup.css"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
//import "./style/signup"
import { signupUser } from "../../../utils/Api";
import Swal from 'sweetalert2';


export default function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const res = await signupUser({ firstName, lastName, email, password, confirm });
<<<<<<< HEAD
       console.log ('user saved:', user );
      //localStorage.setItem('user saved:', user );
      //localStorage.setItem('user', JSON.stringify(res.user));
      alert ('your account is creat');
      navigate('/login');
=======
      console.log("user saved:", res);

      localStorage.setItem("user", JSON.stringify(res)); // store the returned user
    //   alert("Your account has been created successfully!");
  Swal.fire({
  icon: "success",
  title: "Your account has been created successfully!",
  showConfirmButton: false,
  timer: 1500
});


      navigate("/login");
>>>>>>> c549fcd2600551edf6485336ded08db8e9314f6a
    } catch (error) {
      setErr(error.message || 'error');
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
            <input className="form-control" value={firstName} onChange={(e)=>setFirstName(e.target.value)} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Last Name</label>
            <input className="form-control" value={lastName} onChange={(e)=>setLastName(e.target.value)} required />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" value={confirm} onChange={(e)=>setConfirm(e.target.value)} required />
          </div>
        </div>

        {err && <div className="alert alert-danger py-2">{err}</div>}

        <button className="btn signup-cta w-100" type="submit" disabled={loading}>
          {loading ? 'جاري...' : 'Sign up'}
        </button>

        <div className="text-center mt-3 small-muted">
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
}