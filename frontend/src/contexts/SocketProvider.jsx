import { useMemo, useCallback } from 'react';
import SocketContext from './SocketContext';

const SocketProvider = ({ socket, children }) => {
  const getMessages = useCallback(() => {
    socket.on('get messages', (data) => {
      console.log(data);
    });
  }, [socket]);

  const sendMessage = useCallback((data) => {
    socket.emit('send message', data);
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
