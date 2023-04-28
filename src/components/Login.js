import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const url = "http://localhost:8000/api/auth";
    const [user, setUser] = useState({ email: "", password: "" });
    let history = useNavigate();
    const { showAlert } = props;

    const onChange = (e) => {
        setUser({ ...user, [e.target.id]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${url}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: user.email, password: user.password }),
        });
        const json = await response.json();
        
        if(json.success){
            // Save the auth-token in local storage
            localStorage.setItem('token', json.token);
            showAlert("Logged in Successfully", "success");
            history("/");
        }
        else{
            showAlert("Invalid Credentials", "danger");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label for="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp"  value={user.email}onChange={onChange} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label for="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={user.password} onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Login
