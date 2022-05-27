import React  , {useState} from 'react'
import axios from 'axios';
// import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router'


const Registration = () => {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [passwordVerify, setpasswordVerify] = useState("");

    //  const {getLoggedin} = useContext(AuthContext)

    const navigate =  useNavigate()

    const submitRegister = async (e) => {

        e.preventDefault();

        try {
            const registerObj ={
                email : email ,
                password : password ,
                passwordVerify : passwordVerify
            }

            // console.log(registerObj);
          
            
    await axios.post("http://localhost:5000/auth" , registerObj );
    // await getLoggedin();
    navigate("/login")

        }catch(err) {
             console.log(`registration Error: ${err}`);
        }
     
    }

    return (
        <div>

            <h2>New Registration</h2>
            <form onSubmit={submitRegister}>
                <input type="text" placeholder='Email'
                onChange={(e) => setemail(e.target.value)} />
                <input type="text" placeholder='Password' 
                onChange={(e) => setpassword(e.target.value)} />
                <input type="text " placeholder='Verify Password'
                onChange={(e) => setpasswordVerify(e.target.value)}  />
                <button>Registration</button>
            </form>

        </div>
    )
}

export default Registration