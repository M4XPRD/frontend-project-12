import { Routes, Route } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import SignUpPage from './SignUpPage';
import ChatPage from './ChatPage';
import LoginPage from './LoginPage';

const Main = () => (
  <div className="h-100">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container"><a className="navbar-brand" href="/">Hexlet Chat</a></div>
        </nav>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <div className="Toastify" />
    </div>
  </div>
);

export default Main;
