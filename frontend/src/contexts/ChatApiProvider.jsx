import { useMemo, useCallback } from 'react';
import ChatApiContext from './ChatApiContext';

const ChatApiProvider = ({ socket, children }) => {
  const sendMessage = useCallback((payload) => {
    socket.emit('newMessage', payload);
    // { body: "message text", channelId: 1, username: 'admin' }
  }, [socket]);

  const sendChannel = useCallback((payload, callback) => {
    socket.emit('newChannel', payload, callback);
    // { name: "new channel" }
  }, [socket]);

  const sendRemovedChannel = useCallback((payload) => {
    socket.emit('removeChannel', payload);
    // { id: 6 }
  }, [socket]);

  const sendRenamedChannel = useCallback((payload) => {
    socket.emit('renameChannel', payload);
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
    <ChatApiContext.Provider value={providedData}>
      {children}
    </ChatApiContext.Provider>
  );
};

export default ChatApiProvider;
