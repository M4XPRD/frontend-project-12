import { useMemo, useCallback } from 'react';
import SocketContext from './SocketContext';

const SocketProvider = ({ socket, children }) => {
  const getMessage = useCallback(() => {
    socket.on('newMessage', (payload) => {
      console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
    });
  }, [socket]);

  const sendMessage = useCallback((payload) => {
    socket.emit('newMessage', payload);
    // { body: "message text", channelId: 1, username: 'admin' }
  }, [socket]);

  const getChannel = useCallback(() => {
    socket.on('newChannel', (payload) => {
      console.log(payload); // { id: 6, name: "new channel", removable: true }
    });
  }, [socket]);

  const sendChannel = useCallback((payload) => {
    socket.emit('newChannel', payload);
    // { name: "new channel" }
  }, [socket]);

  const getRemovedChannel = useCallback(() => {
    socket.on('removeChannel', (payload) => {
      console.log(payload); // { id: 6 };
    });
  }, [socket]);

  const sendRemovedChannel = useCallback((payload) => {
    socket.emit('removeChannel', payload);
    // { id: 6 }
  }, [socket]);

  const getRenamedChannel = useCallback(() => {
    socket.on('renameChannel', (payload) => {
      console.log(payload); // { id: 7, name: "new name channel", removable: true }
    });
  }, [socket]);

  const sendRenamedChannel = useCallback((payload) => {
    socket.emit('removeChannel', payload);
    // { id: 7, name: "new name channel", removable: true }
  }, [socket]);

  const providedData = useMemo(() => ({
    getMessage,
    sendMessage,
    getChannel,
    sendChannel,
    getRemovedChannel,
    sendRemovedChannel,
    getRenamedChannel,
    sendRenamedChannel,
  }), [
    getMessage,
    sendMessage,
    getChannel,
    sendChannel,
    getRemovedChannel,
    sendRemovedChannel,
    getRenamedChannel,
    sendRenamedChannel]);

  return (
    <SocketContext.Provider value={providedData}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
