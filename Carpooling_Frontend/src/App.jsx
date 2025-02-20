import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import CreateRide from "./pages/CreateRide";
import FindRides from "./pages/FindRides";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import NotFound from "./pages/NotFound";
import BookRide from "./pages/BookRide";
import ProfilePage from "./pages/Profile";
import Footer from "./components/Footer";
import ProtectedRoutes from "./components/ProtectedRoutes";
import EditProfile from "./pages/EditProfile";
<<<<<<< HEAD
import ForgotPassword from "./pages/ForgotPassword";

=======
>>>>>>> e2ec1d2a537680bbec48dfeeb7e29960fa12ff0a
import Reviews from "./pages/Reviews"
import PrivateRoute from "./components/PrivateRoute";
import ChangePassword from "./pages/ChangePassword";
import VerifyEmailPage from "./pages/VerifyEmail";

function App() {
  let userId = null;
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userId = payload.userId; 
      console.log(`User ${userId}`);
    } catch (error) {
      console.error("Invalid token:", error, userId);
    }
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        } />
        <Route path="/find-ride" element={
          <ProtectedRoutes>
            <FindRides />
          </ProtectedRoutes>
        } />
        <Route path="/create-ride" element={
          <ProtectedRoutes>
            <CreateRide />
          </ProtectedRoutes>
        } />

        <Route path="/profile/:userId/edit" element={
          <ProtectedRoutes>
            <EditProfile />
          </ProtectedRoutes>
        } />
        
        <Route path="/about" element={
         <ProtectedRoutes>
            <About />
          </ProtectedRoutes>
        } />

        
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/change-password" element= {<ChangePassword/>}/>
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/book-ride/:id" element={
          <ProtectedRoutes>
            <BookRide />
          </ProtectedRoutes>
        } />
        {userId ? (
          <Route
            path="/profile"
            element={<Navigate to={`/profile/${userId}`} />}
          />
        ) : (        <Route path="/profile" element={<Navigate to="/login" />} />
        )}
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/reviews" element={<Reviews/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Conditionally render the footer only if the user is logged in */}
      {token && <Footer />}
    </div>
  );
}

export default App;
