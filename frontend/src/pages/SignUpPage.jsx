import {
  Row, Col, Card, Form, Button, Container,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUp from '../images/SignUp.jpg';
import routes from '../routes/routes';
import useNetwork from '../hooks/networkHook';
import useAuth from '../hooks/authHook';

const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Слишком короткое имя')
    .max(20, 'Слишком длинное имя')
    .required('Обязательное поле'),
  password: yup
    .string()
    .min(6, 'Слишком короткий пароль')
    .max(50, 'Слишком длинный пароль')
    .required('Обязательное поле'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Обязательное поле'),
});

const SignUpPage = () => {
  const [authError, setAuthError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const usernameFocus = useRef();
  const passwordFocus = useRef();
  const confirmPasswordFocus = useRef();
  const submitFocus = useRef();
  const network = useNetwork();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    usernameFocus.current.focus();
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
      confirmPassword: '',
    },
    validationSchema: signUpSchema,
    validateOnChange: false,
    onSubmit: async () => {
      setAuthError(false);
      setServerError(false);
      axios
        .post(routes.usersPath(), {
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
          const { status } = error.response.status;
          switch (status) {
            case status >= 500:
              return setServerError(true);
            default:
              return setAuthError(true);
          }
        });
    },
  });

  const handleButtonText = (authorizationError, serverConnectionError, connection) => {
    switch (true) {
      case !connection.isOnline:
        return 'Проверьте подключение к сети!';
      case serverConnectionError:
        return 'Неполадки с сервером';
      case authorizationError:
        return 'Пользователь с таким именем уже есть';
      default:
        return 'Зарегистрироваться';
    }
  };

  return (
    <Container fluid className="h-100">
      <Row className="row justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="card shadow-sm">
            <Card.Body className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={SignUp}
                  className="rounded-circle mb-3"
                  alt="Регистрация"
                  id="signUp-image"
                />
              </div>
              <Form id="signUp-form" onSubmit={f.handleSubmit}>
                <h1 className="text-center mb-4" id="signUp-reg">
                  Регистрация
                </h1>
                <Form.Group className="form-floating mb-2">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    required=""
                    placeholder="От 3 до 20 символов"
                    id="username"
                    ref={usernameFocus}
                    onKeyDown={(e) => handleKeyDown(e, passwordFocus)}
                    className={`form-control ${f.errors.username && 'is-invalid'}`}
                    value={f.values.username}
                    onChange={f.handleChange}
                  />
                  <Form.Label className="form-label" htmlFor="username">
                    Имя пользователя
                  </Form.Label>
                  <div className="invalid-tooltip" id="signUp-errors">
                    {f.errors.username}
                  </div>
                </Form.Group>
                <br />
                <Form.Group className="form-floating mb-2 mt-1">
                  <Form.Control
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required=""
                    placeholder="Не менее 6 символов"
                    id="password"
                    ref={passwordFocus}
                    onKeyDown={(e) => handleKeyDown(e, confirmPasswordFocus)}
                    className={`form-control ${f.errors.password && 'is-invalid'}`}
                    value={f.values.password}
                    onChange={f.handleChange}
                  />
                  <div className="invalid-tooltip" id="signUp-errors">
                    {f.errors.password}
                  </div>
                  <Form.Label className="form-label" htmlFor="password">
                    Пароль
                  </Form.Label>
                </Form.Group>
                <br />
                <Form.Group className="form-floating mb-2 mt-1">
                  <input
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required=""
                    placeholder="Пароли должны совпадать"
                    id="confirmPassword"
                    ref={confirmPasswordFocus}
                    onKeyDown={(e) => handleKeyDown(e, submitFocus)}
                    className={`form-control ${f.errors.confirmPassword && 'is-invalid'}`}
                    value={f.values.confirmPassword}
                    onChange={f.handleChange}
                  />
                  <div className="invalid-tooltip" id="signUp-errors">
                    {f.errors.confirmPassword}
                  </div>
                  <Form.Label className="form-label" htmlFor="confirmPassword">
                    Подтвердите пароль
                  </Form.Label>
                </Form.Group>
                <br />
                <Button
                  type="submit"
                  ref={submitFocus}
                  onClick={() => usernameFocus.current.focus()}
                  className={`w-100 mb-3 mt-1 ${!network.isOnline || authError ? 'btn-danger' : 'btn-primary'}`}
                  disabled={f.isSubmitting || !network.isOnline}
                  id="signUp-button"
                >
                  {handleButtonText(authError, serverError, network)}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
