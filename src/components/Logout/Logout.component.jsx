import { useContext } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { TokenContext } from "../../context/context"
import { toast } from "react-hot-toast"

const Logout = () => {
    const navigate = useNavigate()
    const { setToken } = useContext(TokenContext)

    useEffect(() => {
        localStorage.removeItem("token")
        setToken(null)
        toast('Success!', {
            icon: '😋',
          });
        navigate("/login")
    })

    return <></>
}

export default Logout