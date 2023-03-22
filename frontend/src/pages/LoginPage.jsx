import { Link, useNavigate } from 'react-router-dom';
import {
  React, useState, useRef, useEffect,
} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import axios from 'axios';
import {
  Form, Button, Row, Col, Card, Container,
} from 'react-bootstrap';
import Login from '../images/Login.jpg';
import routes from '../routes/routes.js';
import useAuth from '../hooks/authHook';
import useNetwork from '../hooks/networkHook';

const signInSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: yup
    .string()
    .min(5, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const LoginPage = () => {
  const [authError, setAuthError] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const network = useNetwork();
  const loginFocus = useRef();
  const passwordFocus = useRef();
  const submitFocus = useRef();

  useEffect(() => {
    loginFocus.current.focus();
  }, []);

  const handleKeyDown = (event, inputRef) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      inputRef.current.focus();
    }
  };

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: signInSchema,
    validateOnChange: false,
    onSubmit: async () => {
      setAuthError(false);
      axios
        .post(routes.loginPath(), {
          username: f.values.username,
          password: f.values.password,
        })
        .then((responce) => {
          const data = JSON.stringify(responce.data);
          localStorage.clear();
          localStorage.setItem('userInfo', data);
          auth.logIn(data);
          navigate('/');
        })
        .catch((error) => {
          if (error.response.status >= 400) {
            setAuthError(true);
            loginFocus.current.focus();
          }
        });
    },
  });

  const inputClassNames = cn('form-control', {
    'is-invalid': f.errors.username || f.errors.password || authError,
  });

  return (
    <Container fluid className="h-100">
      <Row className="row justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="card shadow-sm">
            <Card.Body className="card-body row p-5">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={Login} className="rounded-circle" alt="Войти" />
              </Col>
              <Form
                onSubmit={f.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0"
              >
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    required=""
                    placeholder="Ваш ник"
                    id="username"
                    ref={loginFocus}
                    onKeyDown={(e) => handleKeyDown(e, passwordFocus)}
                    className={inputClassNames}
                    value={f.values.username}
                    onChange={f.handleChange}
                  />
                  <Form.Label className="form-label" htmlFor="username">
                    Ваш ник
                  </Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-1">
                  <Form.Control
                    name="password"
                    autoComplete="current-password"
                    required=""
                    placeholder="Пароль"
                    type="password"
                    id="password"
                    ref={passwordFocus}
                    onKeyDown={(e) => handleKeyDown(e, submitFocus)}
                    className={inputClassNames}
                    value={f.values.password}
                    onChange={f.handleChange}
                  />
                  <Form.Label className="form-label" htmlFor="password">
                    Пароль
                  </Form.Label>
                  <div
                    className={`invalid-tooltip ${
                      f.errors || authError || !network.isOnline
                        ? ''
                        : 'invisible'
                    }`}
                    id="signIn-error"
                  >
                    {network.isOnline
                      ? 'Неверные имя пользователя или пароль'
                      : 'Проверьте подключение к сети!'}
                  </div>
                </Form.Group>
                <br />
                <Button
                  type="submit"
                  ref={submitFocus}
                  onClick={() => loginFocus.current.focus()}
                  className="w-100 mb-3 btn-primary"
                  disabled={f.isSubmitting || !network.isOnline}
                  id="signIn-login-button"
                >
                  Войти
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <Link to="/signup">Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
