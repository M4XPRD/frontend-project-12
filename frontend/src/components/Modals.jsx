import { useDispatch, useSelector } from 'react-redux';
import { onHide } from '../slices/modalsSlice';
import useSocket from '../hooks/chatApiHook';
import getModal from './modals/index';

const Modals = () => {
  const dispatch = useDispatch();
  const chatApi = useSocket();
  const modalInfo = useSelector((state) => state.modals);
  const hideModal = () => dispatch(onHide({ type: null, item: null }));

  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} socket={chatApi} onHide={hideModal} />;
};

export default Modals;
