import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import { useAuth } from "./store/useAuth.ts";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar.tsx";
import SpeechToText from "./components/SpeechToText.tsx";

const App = () => {
	const { authState, checkAuthState, isCheckingAuth } = useAuth();

	useEffect(() => {
		checkAuthState();
	}, [checkAuthState]);

	// console.log(authState);

	if (isCheckingAuth) {
		return (
			<div className="flex items-center h-screen justify-center">
				<Loader2 className="animate-spin" />
			</div>
		);
	}
	return (
		<>
			<div data-theme="dark">
				<Navbar />

				<Routes>
					<Route
						path="/"
						element={authState ? <Home /> : <Navigate to="/login" />}
					/>
					<Route
						path="/signup"
						element={!authState ? <SignUp /> : <Navigate to="/" />}
					/>
					<Route
						path="/login"
						element={!authState ? <Login /> : <Navigate to="/" />}
					/>
					<Route path="/settings" element={<Settings />} />
					<Route
						path="/profile"
						element={authState ? <Profile /> : <Navigate to="/login" />}
					/>
					<Route
						path="/audio"
						element={authState ? <SpeechToText /> : <Navigate to="/audio" />}
					/>
				</Routes>

				<Toaster />
			</div>
		</>
	);
};

export default App;
