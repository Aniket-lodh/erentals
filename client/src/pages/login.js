import {useNavigate} from "react-router-dom";
import {useState} from "react";
import useToken from "../helpers/useToken";
import axios from "axios";
import "../scss/login.scss"

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
            process.env.REACT_APP_USER_TOKEN = token;
            navigate("/");
        } else {
            console.error(response)
        }
    }

    return (
        <section className="login-container animate-in" style={{animationDelay: "600ms"}}>
            <div className="login-wrapper animate-in" style={{animationDelay: "900ms"}}>
                <div className="login-headings">
                    <h1 className="animate-left" style={{animationDelay: "1300ms"}}>Login</h1>
                    <p className="animate-left" style={{animationDelay: "1500ms"}}>Enter your credentials</p>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-inputs">
                        <label htmlFor="email" className="animate-left" style={{animationDelay: "1600ms"}}>Email</label>
                        <input type="text" name="email" id="email" placeholder="Email" required className="animate-left"
                               style={{animationDelay: "1800ms"}}
                               onChange={e => handleChange(e)}/>
                        <span className="animate-left" style={{animationDelay: "1900ms"}}><i
                            className="ri-user-3-line"></i></span>
                    </div>
                    <div className="login-inputs">
                        <label htmlFor="passcode" className="animate-left"
                               style={{animationDelay: "1600ms"}}>Password</label>
                        <input type="password" name="passcode" id="passcode" placeholder="Password" required
                               className="animate-left" style={{animationDelay: "1800ms"}}
                               onChange={e => handleChange(e)}/>
                        <span className="animate-left" style={{animationDelay: "1900ms"}}><i
                            className="ri-lock-2-fill"></i></span>
                    </div>
                    <div>
                        <div className="keep-me animate-in" style={{animationDelay: "2100ms"}}>
                            <input type="checkbox" id="keep-me"/>
                            <label htmlFor="keep-me">Keep me logged in</label>
                        </div>
                        <i className="forgot-pass animate-in" style={{animationDelay: "2100ms"}}>Forgot password?</i>
                    </div>
                    <button type="submit" className="animate-in" style={{animationDelay: "2300ms"}}>LOGIN</button>
                </form>
            </div>
        </section>
    )
}

export default Login