import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import AuthLayout from "./Layouts/AuthLayout"
import Dashboard from "./Pages/Dashboard"
import AppLayout from "./Layouts/AppLayout"
import NotFound from "./Pages/NotFound"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import { ThemeContextProvider } from "./Context/ThemeContext"
import { AuthProvider } from "./Context/AuthContext"

function App() {

    return (
        <>
            <AuthProvider>
                <ThemeContextProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<AuthLayout />}>
                                <Route index element={<Login />} />
                                <Route path="/register" element={<Register />} />
                            </Route>

                            <Route path="/app" element={<AppLayout />}>
                                <Route index element={<Dashboard />} />
                            </Route>


                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Router>
                </ThemeContextProvider>
            </AuthProvider>

        </>
    )
}

export default App
