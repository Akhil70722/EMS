// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import '../styles/Register.css';

// export default function Register() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:8000/api/register/", {
//         username,
//         email,
//         password,
//         confirm_password: confirmPassword,
//       });

//       alert("Registration successful!");
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.error || "Registration failed");
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Register as Employee</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <form onSubmit={handleRegister}>
//         <label>Username</label>
//         <input value={username} onChange={(e) => setUsername(e.target.value)} required />

//         <label>Email</label>
//         <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" />

//         <label>Password</label>
//         <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" />

//         <label>Confirm Password</label>
//         <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required type="password" />

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/Register.css';

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://192.168.1.29:8000/api/register/", {
        username,
        email,
        password,
        confirm_password: confirmPassword,
      });

      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-background"></div>

      <div className="register-content">
        {/* Left Side */}
        <div className="register-left">
          <img
            src={require('../assets/ems.png')}
            alt="EMS Illustration"
            className="register-illustration"
          />
        </div>

        {/* Right Side */}
        <div className="register-right">
          <h1 className="ems-heading">EMS</h1>
          <img
            src={require('../assets/user-icon.png')}
            alt="User Icon"
            className="user-icon"
          />
          <h2>Register as Employee</h2>
          {error && <p>{error}</p>}

          <form onSubmit={handleRegister}>
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />

            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
            />

            <label>Confirm Password</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              type="password"
            />

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
