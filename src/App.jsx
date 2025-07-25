import { BrowserRouter as Router, Route, Routes } from "react-router-dom"


import Dashboard from "./Pages/Admin/Dashboard"
import NotFound from "./Pages/Auth/NotFound"
import Login from "./Pages/Auth/Login"
import Register from "./Pages/Auth/Register"
import { ThemeContextProvider } from "./Context/ThemeContext"
import { AuthProvider } from "./Context/AuthContext"
import UserLayout from "./Pages/Layouts/UserLayout"
import AdminLayout from "./Pages/Layouts/AdminLayout"
import Profile from "./Components/Profile/Profile"
import Home from "./Pages/Home/Home"
import Exercice from "./Pages/Home/Sections/Exercice"
import Blog from "./Pages/Home/Sections/Blog"
import PrivateRoute from "./Components/Routes/PrivateRoute"
import GuestRoute from "./Components/Routes/GuestRoute"
import Users from "./Pages/Admin/Users/Users"
import Exams from "./Pages/Admin/Exams/Exams"
import HomeLayout from "./Pages/Layouts/HomeLayout"
import ChangePassword from "./Pages/Auth/ChangePasswordRequest"
import ChangeCredential from "./Pages/Auth/ChangeCredential"
import CategoryManagment from "./Pages/Admin/Category/CategoryManagment"
import ExamSummaryHome from "./Pages/Home/Sections/ExamSummaryHome"
import ExamCreateSection from "./Pages/Admin/Exams/ExamCreateSection"

function App() {
    return (
        <>
            <Router>
                <AuthProvider>
                    <ThemeContextProvider>
                        <Routes>
                            <Route path="/" element={<HomeLayout />}>
                                <Route index element={<Home />} />
                                <Route path="ExamsHome" element={<ExamSummaryHome />} />
                        
                                <Route path="Exercice" element={<Exercice />} />
                                <Route path="Blog" element={<Blog />} />
                                <Route path="user" element={<PrivateRoute allowedRoles={["ROLE_USER"]} />}>
                            
                                        <Route path="profile" element={<Profile />} />
                                    
                                </Route>
                            </Route>
                            
                           

                            <Route path="/login" element={<GuestRoute />}>
                                <Route index element={<Login />} />
                                <Route path="singUp" element={<Register />} />
                                <Route path="changePasswordRequest" element={<ChangePassword />} />
                                <Route path="changeCredential" element={<ChangeCredential />} />
                            </Route>

                            <Route path="/app" element={<PrivateRoute allowedRoles={["ROLE_ADMIN", "ROLE_SUPERADMIN"]} />}>
                                <Route element={<AdminLayout />}>
                                    <Route index element={<Dashboard />} />
                                    <Route path="users" element={<Users />} />
                                    <Route path="exams/managment" element={<Exams />} /> 
                                    <Route path="create/exam" element={<ExamCreateSection />} /> 
                                    <Route path="categorys" element={<CategoryManagment />} />
                                    <Route path="blog" element={<Blog />} />
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
