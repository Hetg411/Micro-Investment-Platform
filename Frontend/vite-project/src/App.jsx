import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import Transactions from "./pages/Transactions";
import Goals from "./pages/Goals";
import Portfolio from "./pages/Portfolio";
import RoundUpGrowth from "./pages/RoundUpGrowth";

import "./App.css";

function ProtectedLayout() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="app">
      <Header />

      <div className="main-layout">
        <Sidebar />

        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/growth" element={<RoundUpGrowth />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/*" element={<ProtectedLayout />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;