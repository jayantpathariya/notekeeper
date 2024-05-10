import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import RootLayout from "./layout/root-layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
