import {useState} from "react";

/**
 * Returns a token and a setToken method to get the existing token & save the token.
**/
 export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    }

    const [token, setToken] = useState(getToken());

    const saveToken = (userData) => {
        sessionStorage.setItem('token', JSON.stringify(userData));
        setToken(userData)
    }

    return {
        setToken:saveToken,
        token
    }
}
