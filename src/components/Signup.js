import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const url = "http://localhost:8000/api/auth";
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  let history = useNavigate();
  const { showAlert } = props;

  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${url}/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: user.name, email: user.email, password: user.password }),
    });
    const json = await response.json();

    if (json.success) {
      // Save the auth-token in local storage
      localStorage.setItem('token', json.token);
      showAlert("Account Created Successfully", "success");
      history("/");

    }
    else {
      showAlert("Invalid Credentials", "danger");
    }

  }
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label for="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={user.name} onChange={onChange} />
      </div>
      <div className="mb-3">
        <label for="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={user.email} onChange={onChange} />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label for="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" value={user.password} onChange={onChange} />
      </div>
      <div className="mb-3">
        <label for="cpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="cpassword" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Signup
