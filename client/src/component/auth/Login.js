import React, { useState , useContext } from 'react'
import axios from 'axios';
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router'

const Login = () => {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const navigate = useNavigate()

     const {getLoggedin} = useContext(AuthContext);

    const LoginRegister = async (e) => {

        e.preventDefault();
        try {
            const LoginObj = {
                email: email,
                password: password,
            }
            console.log(LoginObj);
            await axios.post("http://localhost:5000/auth/login", LoginObj);
            await getLoggedin();
            navigate("/")

        } catch (err) {
            console.log(`Login Error: ${err}`);
        }

    }

    return (
        <div>

            <h2>Login Users</h2>

            <form onSubmit={LoginRegister}>

                <input type="text" placeholder='Email'
                    onChange={(e) => setemail(e.target.value)} />
                <input type="text" placeholder='Password'
                    onChange={(e) => setpassword(e.target.value)} />
                <button>Login</button>

            </form>

        </div>
    )
}

export default Login