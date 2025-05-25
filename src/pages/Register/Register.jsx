import React, { useState } from "react";
import Logo from "../../components/Logo/Logo";
import { Link, useNavigate } from "react-router-dom";

import "../Login/Login.scss";
import { useRegisterMutation } from "../../service/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const onRegister = async () => {
    try {
      await register({ name, login, password }).unwrap();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login_wrapper">
      <div className="logo__wrapper">
        <Logo />
      </div>
      <div className="login">
        <form className="login__form" onSubmit={(e) => e.preventDefault()}>
          <span className="login__title">Создайте аккаунт</span>
          <div className="login__inner">
            <div className="login__input-wrapper">
              <img
                className="login__input-img"
                src="https://img.icons8.com/?size=100&id=43942&format=png&color=A6ACBF"
                alt=""
              />
              <input
                className="login__input"
                placeholder="Имя"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="login__input-wrapper">
              <img
                className="login__input-img"
                src="https://img.icons8.com/?size=100&id=LVRA1ecjEwPC&format=png&color=A6ACBF"
                alt=""
              />
              <input
                className="login__input"
                placeholder="Логин"
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
            <div className="login__input-wrapper">
              <img
                className="login__input-img"
                src="https://img.icons8.com/?size=100&id=hbkNn61dlCW4&format=png&color=A6ACBF"
                alt=""
              />
              <input
                className="login__input"
                placeholder="Пароль"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="login__btn" onClick={onRegister}>
              Создать
            </button>
          </div>
        </form>
        <div>
          <span className="login__link-text">Уже есть аккаунт?</span>
          <Link className="login__link" to="/login">
            Войти
          </Link>
        </div>
        <p className="login__text">
          Используя этот сервис, вы подтверждаете , что прочитали и поняли, а
          также соглашаетесь с положениями, условиями и Политикой
          конфиденциальности.
        </p>
      </div>
    </div>
  );
};

export default Register;
