import axios from 'axios';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import Channels from './chatPages/Channels';
import Messages from './chatPages/Messages';
import { addMessages } from '../store/messagesSlice';
import { addChannels, setActiveChannel } from '../store/channelsSlice';
import store from '../store/index';
import routes from '../routes/routes';

const ChatPage = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const getLanguage = JSON.parse(localStorage.getItem('currentLanguage'));
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  useEffect(() => {
    const getData = async () => {
      axios.get(routes.dataPath(), {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
        },
      }).then((responce) => {
        const { channels, messages, currentChannelId } = responce.data;
        const findCurrentChannel = channels.filter((channel) => channel.id === currentChannelId);
        const [currentActiveChannel] = findCurrentChannel;
        store.dispatch(setActiveChannel(currentActiveChannel.id));
        store.dispatch(addChannels(channels));
        store.dispatch(addMessages(messages));
      }).catch(() => {
        toast.danger(t('errors.loadData'));
        setTimeout(() => getData(), 5000);
      });
    };
    getData();
  }, [t]);

  useEffect(() => {
    if (!getLanguage) {
      localStorage.setItem('currentLanguage', JSON.stringify(currentLanguage));
    }
  }, [currentLanguage, getLanguage]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels filter={filter} />
        <Messages filter={filter} />
      </div>
    </div>
  );
};

export default ChatPage;