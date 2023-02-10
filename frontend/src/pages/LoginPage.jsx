/* eslint-disable max-len */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import Login from '../images/Login.jpg';

const signUpSchema = yup.object().shape({
  username: yup.string()
    .min(5, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: yup.string()
    .min(5, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const onSubmit = () => {
  console.log('submitted!');
};

const LoginPage = () => {
  const {
    values, errors, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: signUpSchema,
    validateOnChange: false,
    onSubmit,
  });

  const inputClassnames = cn('form-control', {
    'is-invalid': errors.username || errors.password,
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={Login}
                  className="rounded-circle"
                  alt="Войти"
                />
              </div>
              <form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Войти</h1>
                <div className="form-floating mb-3">
                  <input
                    name="username"
                    autoComplete="username"
                    required=""
                    placeholder="Ваш ник"
                    id="username"
                    className={inputClassnames}
                    value={values.username}
                    onChange={handleChange}
                  />
                  <label htmlFor="username">Ваш ник</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    name="password"
                    autoComplete="current-password"
                    required=""
                    placeholder="Пароль"
                    type="password"
                    id="password"
                    className={inputClassnames}
                    value={values.password}
                    onChange={handleChange}
                  />
                  <label className="form-label" htmlFor="password">Пароль</label>
                  {(errors.username || errors.password) && <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>}
                </div>
                <button
                  type="submit"
                  className="w-100 mb-3 btn btn-outline-primary"
                >
                  Войти
                </button>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <Link to="/signup">Регистрация</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
