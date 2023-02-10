import { Routes, Route } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

const ChatMain = () => (
  <div className="h-100">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container"><a className="navbar-brand" href="/">Hexlet Chat</a></div>
        </nav>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <div className="Toastify" />
    </div>
  </div>
);

export default ChatMain;
