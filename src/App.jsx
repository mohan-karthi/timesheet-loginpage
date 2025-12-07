import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

import ProductAdmin from "./pages/ProductAdmin";
import ClientAdmin from "./pages/ClientAdmin";
import Manager from "./pages/Manager";
import TeamLead from "./pages/TeamLead";
import Employee from "./pages/Employee";
import Hr from "./pages/Hr";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/product-admin" element={<ProductAdmin />} />
        <Route path="/client-admin" element={<ClientAdmin />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/team-lead" element={<TeamLead />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/hr" element={<Hr />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
