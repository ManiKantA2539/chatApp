import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import Settings from "./components/Settings"
import Profile from "./components/Profile"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App