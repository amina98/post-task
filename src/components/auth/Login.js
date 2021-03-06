import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import styles from "./Login.module.css";
import { useDispatch } from "react-redux";
import { loginUserAction } from "./userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    userName: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const regesteredUserData = {
    userName: "user1",
    password: "12345678",
    name: "mahdi",
    lastName: "jafarzadeh",
  };
  const changeHandler = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const loginHandler = () => {
    if (
      userInfo.userName == regesteredUserData.userName &&
      userInfo.password == regesteredUserData.password
    ) {
      setErr(null);
      dispatch(loginUserAction(regesteredUserData));
      navigate("/");
    } else {
      console.log("login faild");
      setErr("username or password wrong");
    }
  };
  return (
    <Container className={styles.loginForm}>
      <form>
        <div className={styles.formFeild}>
          <label>username:</label>
          <input
            type={"text"}
            value={userInfo.userName}
            name="userName"
            onChange={changeHandler}
          />
        </div>
        <div className={styles.formFeild}>
          <label>password:</label>
          <input
            type={"password"}
            value={userInfo.password}
            name="password"
            onChange={changeHandler}
          />
        </div>
        <div className={styles.loginBtn} onClick={loginHandler}>
          login
        </div>
        {err && <span style={{ color: "red" }}>{err}</span>}
      </form>
    </Container>
  );
};

export default Login;
