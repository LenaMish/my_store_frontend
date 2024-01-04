import axios from 'axios'
import { ENDPOINTS } from "../../api/endpoints";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import Input from "../common/Input.component";
import { useState } from "react";
import "./Register.component.css"


const Inputs = [
    { name: "username", label: "Username", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "password-confirmation", label: "Password confirmation", type: "password" },
]

const Register = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({
        "username": [],
        "email": [],
        "password": [],
        "password-confirmation": []
    })

    const handleLogin = async (e) => {
        e.preventDefault() //nie robi odswiezania po kliknieciu w formularz

        const formData = new FormData(e.target)
        const body = Object.fromEntries(formData)
        try {
            const response = await axios.post(ENDPOINTS.Register, body)
            if (response.status === 201) {
                toast('Good Job!', {
                    icon: '🥰',
                });
                navigate("/login")
            }
        } catch (error) {
            console.log(error.response.data)
            if (error.response.status === 400) {
                setErrors(error.response.data)
            }
        }

    }

    return (
        <div class="register-container">
            <form onSubmit={handleLogin} className="register-form">
                <h1 className="register-header">Sign Up</h1>
               {Inputs.map(inp => <Input key={inp.name} name={inp.name} label={inp.label} type={inp.type} errors={errors[inp.name]} />)}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Register