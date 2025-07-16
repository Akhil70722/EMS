import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import '../styles/EmployeeForm.css';

export default function EmployeeForm() {
  const nav = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    salary: '',
    is_active: true
  });

  const [error, setError] = useState('');

  const designationOptions = [
    'Python Developer',
    'Data Scientist',
    'Sr. Data Scientist',
    'Team Lead',
    'Full Stack Developer'
  ];

  useEffect(() => {
    if (id) {
      api.get(`employees/${id}/`)
        .then(res => setForm(res.data))
        .catch(() => setError('Failed to load employee data.'));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');

  //   try {
  //     if (id) {
  //       // Update existing employee
  //       await api.put(`employees/${id}/`, form);
  //     } else {
  //       // Step 1: Register a new user
  //       const username = form.name.toLowerCase().replace(/\s+/g, '');
  //       const defaultPassword = 'defaultpass123';

  //       const userRes = await api.post('/register/', {
  //         username,
  //         email: form.email,
  //         password: defaultPassword,
  //         confirm_password: defaultPassword
  //       });

  //       const userId = userRes.data.id;

  //       // Step 2: Create employee and link user_id
  //       await api.post('/employees/', {
  //         ...form,
  //         user_id: userId
  //       });
  //     }

  //     alert('✅ Employee saved successfully.');
  //     nav('/employees');
  //   } catch (err) {
  //     const message = err.response?.data
  //       ? JSON.stringify(err.response.data)
  //       : '❌ Submission failed.';
  //     setError(message);
  //   }
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    if (id) {
      // Update existing employee
      await api.put(`employees/${id}/`, form);
    } else {
      const username = form.name.toLowerCase().replace(/\s+/g, '');
      const defaultPassword = 'defaultpass123';

      // Check if user already exists
      const checkRes = await api.get(`/check-user-exists/${username}/`);
      let userId;

      if (checkRes.data.exists) {
        userId = checkRes.data.user_id;
      } else {
        // Register new user
        const userRes = await api.post('/register/', {
          username,
          email: form.email,
          password: defaultPassword,
          confirm_password: defaultPassword
        });
        userId = userRes.data.id;
      }

      // Step 2: Create employee profile linked to user
      await api.post('/employees/', {
        ...form,
        user_id: userId
      });
    }

    alert('✅ Employee saved successfully.');
    nav('/employees');
  } catch (err) {
    const message = err.response?.data
      ? JSON.stringify(err.response.data)
      : '❌ Submission failed.';
    setError(message);
  }
};

  return (
    <div className="employee-form-container">
      <form onSubmit={handleSubmit} className="emp-form">
        <h2>{id ? 'Edit' : 'Add'} Employee</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />

        {/* Dropdown for Designation */}
        <label>Designation:</label>
        <select
          name="designation"
          value={form.designation}
          onChange={handleChange}
          required
        >
          <option value="">Select Designation</option>
          {designationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          required
        />

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="is_active"
            checked={form.is_active}
            onChange={handleChange}
          />
          Active Employee
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}


// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import api from '../api/axiosConfig';
// import '../styles/EmployeeForm.css';

// export default function EmployeeForm() {
//   const nav = useNavigate();
//   const { id } = useParams();

//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     department: '',
//     designation: '',
//     salary: '',
//     is_active: true
//   });

//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (id) {
//       api.get(`employees/${id}/`)
//         .then(res => setForm(res.data))
//         .catch(() => setError('Failed to load employee data.'));
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = {
//       ...form,
//       salary: parseFloat(form.salary)  // Ensure salary is a number
//     };

//     console.log("📤 Submitting form data:", formData); // ✅ Log for debugging

//     try {
//       if (id) {
//         await api.put(`employees/${id}/`, formData);
//       } else {
//         await api.post('employees/', formData);
//       }
//       nav('/employees');
//     } catch (err) {
//       const backendError = err.response?.data;
//       console.error("❌ Backend error:", backendError); // ✅ Log backend error

//       const message = backendError
//         ? Object.entries(backendError).map(([key, val]) => `${key}: ${val}`).join('\n')
//         : 'Submission failed.';

//       setError(message);
//     }
//   };

//   return (
//     <div className="employee-form-container">
//       <form onSubmit={handleSubmit} className="emp-form">
//         <h2>{id ? 'Edit' : 'Add'} Employee</h2>

//         {error && <p className="error">{error}</p>}

//         <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
//         <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
//         <input type="text" name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
//         <input type="text" name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} required />
//         <input type="number" name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} required />

//         <label className="checkbox-label">
//           <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
//           Active Employee
//         </label>

//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// }
