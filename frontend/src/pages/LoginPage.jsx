/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import axios from 'axios';
import { React, useEffect } from 'react';
import Login from '../images/Login.jpg';
import routes from '../routes/routes.js';
// import useAuth from './../hooks/index';

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

const LoginPage = () => {
  // const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/');
    }
  }, [navigate]);

  const {
    values, errors, handleChange, handleSubmit, setSubmitting,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: signUpSchema,
    validateOnChange: false,
    onSubmit: async () => {
      setSubmitting(true);
      await axios.post(routes.loginPath(), { username: values.username, password: values.password })
        .then((responce) => {
          // eslint-disable-next-line max-len
          // {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…M2MX0.AZxACqKsoCWitmYYzgzyHh5i5W9oWX6ualKLKI-MqsE', username: 'admin'}
          localStorage.clear();
          localStorage.setItem('authToken', JSON.stringify(responce.data));
          // useAuth();
          navigate('/');
        })
        .catch((error) => {
          if (error.response.status >= 400) {
            errors.token = true;
          }
        });
      setSubmitting(false);
    },
  });

  const inputClassnames = cn('form-control', {
    'is-invalid': errors.username || errors.password || errors.token,
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
                  {errors && <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>}
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
