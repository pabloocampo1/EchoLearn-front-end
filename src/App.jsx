import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import AuthLayout from "./Layouts/AuthLayout"
import Dashboard from "./Pages/Admin/Dashboard"
import NotFound from "./Pages/Auth/NotFound"
import Login from "./Pages/Auth/Login"
import Register from "./Pages/Auth/Register"
import { ThemeContextProvider } from "./Context/ThemeContext"
import { AuthProvider } from "./Context/AuthContext"
import UserLayout from "./Layouts/UserLayout"
import AdminLayout from "./Layouts/AdminLayout"
import Profile from "./Pages/User/Profile"
import Home from "./Pages/Home/Home"
import Exercice from "./Pages/Home/Sections/Exercice"
import Blog from "./Pages/Home/Sections/Blog"
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
                                <Route element={<PrivateRoute allowedRoles={["ROLE_USER"]} />}>
                                    <Route path="profile" element={<Profile />} />
                                </Route>
                                <Route path="Exams" element={<Profile />} />
                                <Route path="Exercice" element={<Exercice />} />
                                <Route path="Blog" element={<Blog />} />
                            </Route>

                            <Route path="/login" element={<GuestRoute />}>
                                <Route index element={<Login />} />
                                <Route path="singUp" element={<Register />} />
                            </Route>

                            <Route path="/app" element={<PrivateRoute allowedRoles={["ROLE_ADMIN", "ROLE_SUPERADMIN"]} />}>
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
