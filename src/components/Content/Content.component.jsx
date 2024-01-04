import { Route, Routes } from "react-router-dom"
import Home from "../Home/Home.component"
import Login from "../Login/Login.component"
import Logout from "../Logout/Logout.component"
import NotFound from "../NotFound/NotFound.component"
import Register from "../Register/Register.component"

const Content = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/logout" element={<Logout/>} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </div>
    )
}

export default Content