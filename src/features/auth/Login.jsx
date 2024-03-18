import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { setCrediential } from "./authSlice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "./authApiSlice";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setError("");
  }, [user, password]);
  const handleUserState = (e) => setUser(e.target.value);
  const handlePasswordState = (e) => setPassword(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ user, password }).unwrap();
      dispatch(setCrediential({ ...result, user }));
      setUser("");
      setPassword("");
      navigate("/welcome");
    } catch (error) {
      if (!error?.response) {
        setError("No server response");
      } else if (error?.response?.status === 400) {
        setError("Missing username or password");
      } else if (error?.response?.status === 401) {
        setError("Unauthorized");
      } else {
        setError("Login Failed");
      }
      errRef.current.focus();
    }
  };
  const content = isLoading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>{error}</p>
  ) : (
    <section className="login">
      <h1>Login form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          onChange={handleUserState}
          autoComplete="off"
          id="username"
          required
          ref={userRef}
          value={user}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          onChange={handlePasswordState}
          id="password"
          required
          value={password}
        />
        <button>Sign In</button>
      </form>
    </section>
  );
  return content;
};

export default Login;
