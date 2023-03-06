import { useMemo, useCallback } from 'react';
import SocketContext from './SocketContext';

const SocketProvider = ({ socket, children }) => {
  const getMessages = useCallback((data) => {
    socket.on('getMessages', data);
  }, [socket]);

  const sendMessage = useCallback((message) => {
    socket.emit('sendMessage', message);
  }, [socket]);

  const providedData = useMemo(() => ({
    getMessages,
    sendMessage,
  }), [getMessages, sendMessage]);

  return (
    <SocketContext.Provider value={providedData}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
