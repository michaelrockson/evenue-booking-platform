import { Route, Routes } from "react-router";
import "./App.css";
import LoginPage from "@/pages/LoginPage.tsx";
import SignUpPage from "@/pages/SignUpPage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
