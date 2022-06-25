import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<AuthPage isLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
