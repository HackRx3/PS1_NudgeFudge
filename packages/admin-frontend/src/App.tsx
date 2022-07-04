import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/shared";
import RequireAuth from "./components/shared/RequireAuth";
import { Login, Campaigns, Triggers, Projects, Integrations } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "./hooks/useAuth";

function App() {
  const auth = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            auth.isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<RequireAuth />}>
          <Route index element={<Projects />} />
          <Route path=":app_id" element={<DashboardLayout />}>
            <Route index element={<Integrations />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="triggers" element={<Triggers />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
