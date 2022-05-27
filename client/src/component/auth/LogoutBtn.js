import React ,{useContext} from 'react'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router'

const LogoutBtn = () => {

    const navigate = useNavigate()
 
    const {getLoggedin} = useContext(AuthContext)

    const logout = async () => {
        await axios.get("http://localhost:5000/auth/logout")
        await getLoggedin();
        navigate("/")
    }

    return <button onClick={logout}>Logout</button>
}

export default LogoutBtn