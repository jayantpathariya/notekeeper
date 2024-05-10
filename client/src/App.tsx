import { BrowserRouter, Route, Routes } from "react-router-dom";

import RootLayout from "./layout/root-layout";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Notebook from "./pages/notebook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/notebooks/:id" element={<Notebook />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
