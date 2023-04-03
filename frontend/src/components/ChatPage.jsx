import axios from 'axios';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Channels from './chatPages/Channels';
import Messages from './chatPages/Messages';
import { addMessages } from '../slices/messagesSlice';
import { addChannels, setActiveChannel } from '../slices/channelsSlice';
import store from '../slices/index';
import routes from '../routes/routes';
import useLang from '../hooks/langHook';
import useAuth from '../hooks/authHook';

const ChatPage = () => {
  const { t } = useTranslation();
  const lang = useLang();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      axios.get(routes.dataPath(), {
        headers: {
          Authorization: `Bearer ${auth.getUserInfo().token}`,
        },
      }).then((responce) => {
        const { channels, messages, currentChannelId } = responce.data;
        const findCurrentChannel = channels.filter((channel) => channel.id === currentChannelId);
        const [currentActiveChannel] = findCurrentChannel;
        store.dispatch(setActiveChannel(currentActiveChannel.id));
        store.dispatch(addChannels(channels));
        store.dispatch(addMessages(messages));
      }).catch((err) => {
        if (err.code === 'ERR_BAD_RESPONSE') {
          auth.logOut();
          navigate(routes.loginPage());
        } else if (err) {
          toast.danger(t('errors.loadData'));
          setTimeout(() => getData(), 5000);
        }
      });
    };
    getData();
  }, [t, auth, navigate]);

  useEffect(() => {
    if (!lang.getLocalLanguage()) {
      lang.setLocalLanguage();
    }
  }, [lang]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </div>
  );
};

export default ChatPage;
