import { Link, useNavigate } from 'react-router-dom';
import { React, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import Login from '../images/Login.jpg';
import routes from '../routes/routes.js';
import useAuth from '../hooks/index';

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
  const [authError, setAuthError] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/');
    }
  }, [navigate]);

  const {
    values, errors, handleChange, handleSubmit, isSubmitting,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: signUpSchema,
    validateOnChange: false,
    onSubmit: async () => {
      setAuthError(false);
      await axios.post(routes.loginPath(), { username: values.username, password: values.password })
        .then((responce) => {
          localStorage.clear();
          localStorage.setItem('userInfo', JSON.stringify(responce.data));
          console.log(localStorage.getItem('userInfo'));
          auth.logIn();
          console.log(auth.isLoggedIn);
          navigate('/');
        })
        .catch((error) => {
          if (error.response.status >= 400) {
            setAuthError(true);
          }
        });
    },
  });

  const inputClassNames = cn('form-control', {
    'is-invalid': errors.username || errors.password || authError,
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
              <Form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    required=""
                    placeholder="Ваш ник"
                    id="username"
                    className={inputClassNames}
                    value={values.username}
                    onChange={handleChange}
                  />
                  <Form.Label htmlFor="username">Ваш ник</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    name="password"
                    autoComplete="current-password"
                    required=""
                    placeholder="Пароль"
                    type="password"
                    id="password"
                    className={inputClassNames}
                    value={values.password}
                    onChange={handleChange}
                  />
                  <Form.Label className="form-label" htmlFor="password">
                    Пароль
                  </Form.Label>
                  {(errors || authError) && <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>}
                </Form.Group>
                <Button
                  type="submit"
                  className="w-100 mb-3 btn-outline-primary btn-light"
                  disabled={isSubmitting}
                  style={{
                    position: 'relative',
                    marginTop: '10px',
                  }}
                >
                  Войти
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
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
