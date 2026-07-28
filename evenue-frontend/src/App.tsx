import { Routes, Route } from "react-router";
import "./App.css";
import LoginForm from "@/features/authentication/components/LoginForm.tsx";
import SignupForm from "@/features/authentication/components/SignupForm.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </>
  );
}

export default App;
