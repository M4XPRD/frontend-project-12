/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dropdown, Button, Nav, Col,
} from 'react-bootstrap';
import { setActiveChannel } from '../../store/activeChannelSlice';
import getModal from '../modals/index';
import useSocket from '../../hooks/socketHook';

const renderModal = ({ modalInfo, hideModal, socket }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} socket={socket} onHide={hideModal} />;
};

const renderChannels = (channel, activeChannelName, handleClick, showModal) => {
  const { id, name, removable } = channel;
  return (
    removable ? (
      <Nav.Item className="nav-item w-100" key={id}>
        <Dropdown role="group" className="d-flex dropdown btn-group">
          <Button
            onClick={() => handleClick(name, id)}
            type="button"
            variant="white"
            className={`w-100 rounded-0 text-start text-truncate btn ${
              activeChannelName === name ? 'btn-secondary' : ''
            }`}
          >
            <span className="me-1">#</span>
            {name}
          </Button>
          <Dropdown.Toggle
            type="button"
            variant="white"
            className={`flex-grow-0 dropdown-toggle dropdown-toggle-split btn ${
              activeChannelName === name ? 'btn-secondary' : ''
            }`}
          />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => showModal('removing', { id })}>Удалить</Dropdown.Item>
            <Dropdown.Item onClick={() => showModal('renaming', { id, name, removable })}>Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
    ) : (
      <Nav.Item className="nav-item w-100" key={id}>
        <Button
          onClick={() => handleClick(name, id)}
          type="button"
          variant="white"
          className={`w-100 rounded-0 text-start btn ${
            activeChannelName === name ? 'btn-secondary' : ''
          }`}
        >
          <span className="me-1">#</span>
          {name}
        </Button>
      </Nav.Item>
    )
  );
};

const Channels = () => {
  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const socket = useSocket();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.allChannels);
  const activeChannelName = useSelector(
    (state) => state.activeChannel,
  ).name;
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  const handleClick = (name, id) => {
    const channelData = { name, id };
    dispatch(setActiveChannel(channelData));
  };

  return (
    <>
      <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>Каналы</b>
          <button
            onClick={() => showModal('adding')}
            type="button"
            className="p-0 text-primary btn btn-group-vertical"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            <span className="visually-hidden">+</span>
          </button>
        </div>
        <Nav
          id="channels-box"
          className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        >
          {channels
          && channels
            .map((channel) => renderChannels(channel, activeChannelName, handleClick, showModal))}
        </Nav>
      </Col>
      {renderModal({ modalInfo, hideModal, socket })}
    </>
  );
};

export default Channels;
