
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/Login.css'; 

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       // Step 1: Get JWT tokens
//       const tokenRes = await axios.post('http://localhost:8000/api/token/', {
//         username,
//         password,
//       });

//       const { access, refresh } = tokenRes.data;
//       localStorage.setItem('access', access);
//       localStorage.setItem('refresh', refresh);

//       // Step 2: Get user info
//       const userRes = await axios.get('http://localhost:8000/api/me/', {
//         headers: {
//           Authorization: `Bearer ${access}`,
//         },
//       });

//       const user = userRes.data;
//       localStorage.setItem('user', JSON.stringify(user)); // store full user object

//       console.log('Logged in user:', user); // for debugging

//       // Step 3: Redirect based on role
//       if (user.role === 'admin') {
//         navigate('/dashboard');
//       } else if (user.role === 'employee') {
//         navigate('/employee-dashboard'); // ✅ match exact route spelling
//       } else {
//         setError('Unknown role. Please contact admin.');
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2 className="login-title">Login</h2>

//         {error && <p className="login-error">{error}</p>}

//         <form onSubmit={handleLogin}>
//           <div className="form-group">
//             <label>Username:</label>
//             <input
//               type="text"
//               required
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="form-input"
//             />
//           </div>

//           <div className="form-group">
//             <label>Password:</label>
//             <input
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-input"
//             />
//           </div>

//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>

//         <p className="login-link">
//           Don't have an account? <Link to="/register">Register here</Link>
//         </p>
//       </div>
//     </div>
//   );
// }



// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/Login.css';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const tokenRes = await axios.post('http://localhost:8000/api/token/', {
//         username,
//         password,
//       });

//       const { access, refresh } = tokenRes.data;
//       localStorage.setItem('access', access);
//       localStorage.setItem('refresh', refresh);

//       const userRes = await axios.get('http://localhost:8000/api/me/', {
//         headers: {
//           Authorization: `Bearer ${access}`,
//         },
//       });

//       const user = userRes.data;
//       localStorage.setItem('user', JSON.stringify(user));
//       console.log('Logged in user:', user);

//       if (user.role === 'admin') {
//         navigate('/dashboard');
//       } else if (user.role === 'employee') {
//         navigate('/employee-dashboard');
//       } else {
//         setError('Unknown role. Please contact admin.');
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       {/* Left section */}
//       <div className="login-left">
//         <h1 className="ems-heading">EMS</h1>
//         <img
//           src={require('../assets/user-icon.png')} // your profile image
//           alt="User Icon"
//           className="user-icon"
//         />
//         <h2 className="signin-heading">Sign In</h2>
//         <form onSubmit={handleLogin} className="login-form">
//           {error && <p className="login-error">{error}</p>}
//           <div className="form-group">
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="signin-btn">Sign In</button>
//         </form>
//         <p className="forgot-link">Forgot Password?</p>
//         <p className="register-link">
//           Don't have an account? <Link to="/register">Register</Link>
//         </p>
//       </div>

//       {/* Right section */}
//       <div className="login-right">
//         <img
//           src={require('../assets/ems.png')} // your illustration image
//           alt="Background Illustration"
//           className="background-illustration"
//         />
//       </div>
//     </div>
//   );  
// }

// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/Login.css';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const tokenRes = await axios.post('http://localhost:8000/api/token/', {
//         username,
//         password,
//       });

//       const { access, refresh } = tokenRes.data;
//       localStorage.setItem('access', access);
//       localStorage.setItem('refresh', refresh);

//       const userRes = await axios.get('http://localhost:8000/api/me/', {
//         headers: {
//           Authorization: `Bearer ${access}`,
//         },
//       });

//       const user = userRes.data;
//       localStorage.setItem('user', JSON.stringify(user));
//       console.log('Logged in user:', user);

//       if (user.role === 'admin') {
//         navigate('/dashboard');
//       } else if (user.role === 'employee') {
//         navigate('/employee-dashboard');
//       } else {
//         setError('Unknown role. Please contact admin.');
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="background-blur"></div>

//       <div className="login-card">
//         {/* Left Side: EMS illustration */}
//         <div className="login-left">
//           <img
//             src={require('../assets/ems.png')}
//             alt="EMS Illustration"
//             className="ems-illustration"
//           />
//         </div>

//         {/* Right Side: Login Form */}
//         <div className="login-right">
//           {/* EMS text and user icon */}
//           <h1 className="ems-heading">EMS</h1>
//           <img
//             src={require('../assets/user-icon.png')}
//             alt="User Icon"
//             className="user-icon"
//           />
//           <h2 className="signin-heading">Sign In</h2>

//           {error && <p className="login-error">{error}</p>}

//           <form onSubmit={handleLogin} className="login-form">
//             <div className="form-group">
//               <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit" className="signin-btn">Sign In</button>
//           </form>

//           <p className="forgot-link">Forgot Password?</p>
//           <p className="register-link">
//             Don’t have an account? <Link to="/register">Register</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const tokenRes = await axios.post('http://192.168.1.29:8000/api/token/', {
        username,
        password,
      });

      const { access, refresh } = tokenRes.data;
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);

      const userRes = await axios.get('http://192.168.1.29:8000/api/me/', {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      // const userRes = await axiosInstance.get('/me/');

      const user = userRes.data;
      localStorage.setItem('user', JSON.stringify(user));
      console.log('Logged in user:', user);

      if (user.role === 'admin') {
        navigate('/dashboard');
      } else if (user.role === 'employee') {
        navigate('/employee-dashboard');
      } else {
        setError('Unknown role. Please contact admin.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-wrapper">
      {/* Blurred background */}
      <div className="login-background" />

      {/* Main login box */}
      <div className="login-content">
        {/* Left side: EMS Image */}
        <div className="login-left">
          <img
            src={require('../assets/ems.png')}
            alt="EMS Illustration"
            className="ems-illustration"
          />
        </div>

        {/* Right side: Login form */}
        <div className="login-right">
          <h1 className="ems-heading">EMS</h1>
          <img
            src={require('../assets/user-icon.png')}
            alt="User Icon"
            className="user-icon"
          />
          <h2 className="signin-heading">Sign In</h2>
          <form onSubmit={handleLogin} className="login-form">
            {error && <p className="login-error">{error}</p>}
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="signin-btn">Sign In</button>
          </form>
          <p className="forgot-link">Forgot Password?</p>
          <p className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
