import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, setAuthHeader } from "../services/authService";
import "../index.css";

export default function Login() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const rolePathMap = {
    product_admin: "/product-admin",
    client_admin: "/client-admin",
    manager: "/manager",
    team_lead: "/team-lead",
    employee: "/employee",
    hr: "/hr",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!employeeId || !password) {
      setError("Employee ID and Password are required");
      return;
    }

    try {
      setLoading(true);
      const data = await login(employeeId, password);

      if (data.status !== "success") {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("role", data.role);

      setAuthHeader(data.access);

      const path = rolePathMap[data.role];
      if (path) navigate(path);
      else setError("Unknown role received from server");
    } catch (err) {
      const serverMsg =
        err?.response?.data?.message || err?.response?.data?.detail;
      setError(serverMsg || "Invalid Employee ID or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2 className="login-title">Timesheet Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="icon">👤</span>
            <input
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="Employee ID"
            />
          </div>

          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </div>
  );
}
