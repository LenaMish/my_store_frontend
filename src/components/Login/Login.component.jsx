import "./Login.component.css"
import axios from 'axios'
import { ENDPOINTS } from "../../api/endpoints";
import { useContext } from "react";
import { TokenContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import Input from "../common/Input.component";


const Login = () => {
    const { setToken, setRefreshToken } = useContext(TokenContext)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault() //nie robi odswiezania po kliknieciu w formularz

        const formData = new FormData(e.target)
        const body = Object.fromEntries(formData)
        try {
            const response = await axios.post(ENDPOINTS.Login, body)
            if (response.status === 200) {
                localStorage.setItem("token", response.data.access)
                setToken(response.data.access)
                localStorage.setItem("refreshToken", response.data.refresh)
                setToken(response.data.refresh)
                toast('Good Job!', {
                    icon: '🥰',
                });
                navigate("/")
            }
        } catch (error) {
            console.log(error.response.data.message)
        }

    }

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h1 className="login-header">Hello again!</h1>
                <Input id="username" name="username" label="Username" />
                <Input id="password" name="password" type="password" label="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login