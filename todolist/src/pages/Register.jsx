import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Register() {
  const navigate = useNavigate();
  return (
    <div className="formulario-container">
      <h1>Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const username = formData.get("username");
          const password = formData.get("password");
          console.log(username, password);

          navigate("/");
        }}
      >
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
