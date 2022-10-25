import "../scss/login.scss"
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import useToken from "../helpers/useToken";

function Login() {
    const [user, setUser] = useState({
        "email": '',
        "passcode": ''
    });
    const {token, setToken} = useToken();


    const navigate = useNavigate();
    const handleChange = function (event) {
        const {name, value} = event.target;
        setUser(pVal => {
            return {
                ...pVal,
                [name]: value
            }
        })
    };

    const loginUser = async function (credentials) {
        return axios.post('http://localhost:8000/users/login', credentials)
            .then(resp => resp.data)
            .catch(err => err.response.data)
    }

    const handleSubmit = async function (e) {
        e.preventDefault();
        const response = await loginUser(user);
        //TODO:improve the response sending/alert message
        if (response.status === 200) {
            setToken(response.data);
            navigate("/");
        } else {
            console.error(response)
        }
    }

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>email</label>
                <input type="text" name="email" required onChange={e => handleChange(e)}/>
                <label>Password</label>
                <button type="submit">Submit</button>
                <input type="password" name="passcode" required onChange={e => handleChange(e)}/>
            </form>
        </div>
    )
}

export default Login