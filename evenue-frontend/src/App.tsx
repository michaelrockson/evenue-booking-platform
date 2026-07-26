import { Routes, Route } from "react-router";
import "./App.css";
import LoginForm from "@/features/authentication/components/LoginForm.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </>
  );
}

export default App;
