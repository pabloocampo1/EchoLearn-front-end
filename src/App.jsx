import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import AuthLayout from "./Layouts/AuthLayout"
import Dashboard from "./Pages/Dashboard"
import NotFound from "./Pages/NotFound"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import { ThemeContextProvider } from "./Context/ThemeContext"
import { AuthProvider } from "./Context/AuthContext"
import UserLayout from "./Layouts/UserLayout"
import AdminLayout from "./Layouts/AdminLayout"
import Profile from "./Pages/Profile"
import Home from "./Pages/Home"
import Exercice from "./Pages/Exercice"
import Blog from "./Pages/Blog"
import PrivateRoute from "./Components/Routes/PrivateRoute"
import GuestRoute from "./Components/Routes/GuestRoute"

function App() {

    return (
        <>
            <Router>
                <AuthProvider>
                    <ThemeContextProvider>
                        <Routes>
                            <Route path="/" element={<UserLayout />}>
                                <Route index element={<Home />} />
                                <Route path="profile" element={<Profile />} />
                                <Route path="Exams" element={<Profile />} />
                                <Route path="Exercice" element={<Exercice />} />
                                <Route path="Blog" element={<Blog />} />
                            </Route>

                            <Route path="/login" element={<GuestRoute />}>
                                <Route index element={<Login />} />
                                <Route path="register" element={<Register />} />
                            </Route>

                            <Route path="/app" element={<PrivateRoute />}>
                                <Route element={<AdminLayout />}>
                                    <Route index element={<Dashboard />} />
                                </Route>
                            </Route>


                            <Route path="*" element={<NotFound />} />
                        </Routes>

                    </ThemeContextProvider>
                </AuthProvider>
            </Router>
        </>
    )
}

export default App
