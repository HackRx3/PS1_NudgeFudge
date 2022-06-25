import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/shared";
import RequireAuth from "./components/shared/RequireAuth";
import { Login, Campaigns, Triggers } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="triggers" element={<Triggers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
