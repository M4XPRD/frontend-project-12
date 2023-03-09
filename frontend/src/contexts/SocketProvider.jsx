import { useMemo, useCallback } from 'react';
import SocketContext from './SocketContext';

const SocketProvider = ({ socket, children }) => {
  const sendMessage = useCallback((payload) => {
    socket.emit('newMessage', payload, (callback) => {
      callback({
        status: 'ok',
      });
    });
    // { body: "message text", channelId: 1, username: 'admin' }
  }, [socket]);

  const sendChannel = useCallback((payload) => {
    socket.emit('newChannel', payload);
    // { name: "new channel" }
  }, [socket]);

  const sendRemovedChannel = useCallback((payload) => {
    socket.emit('removeChannel', payload);
    // { id: 6 }
  }, [socket]);

  const sendRenamedChannel = useCallback((payload) => {
    socket.emit('removeChannel', payload);
    // { id: 7, name: "new name channel", removable: true }
  }, [socket]);

  const providedData = useMemo(() => ({
    sendMessage,
    sendChannel,
    sendRemovedChannel,
    sendRenamedChannel,
  }), [
    sendMessage,
    sendChannel,
    sendRemovedChannel,
    sendRenamedChannel]);

  return (
    <SocketContext.Provider value={providedData}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
