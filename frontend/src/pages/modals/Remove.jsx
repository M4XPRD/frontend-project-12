import React, { useEffect, useRef } from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import useNetwork from '../../hooks/networkHook';
import { setActiveChannel } from '../../store/channelsSlice';

const Remove = ({ socket, onHide, modalInfo }) => {
  const activeChannelId = useSelector((state) => state.channels.activeChannel).id;
  const channels = useSelector((state) => state.channels.allChannels);
  const [firstChannel] = channels;
  const dispatch = useDispatch();
  const inputRef = useRef();
  const network = useNetwork();

  const f = useFormik({
    initialValues: {
      removingChannelId: modalInfo.item.id,
    },
    onSubmit: () => {
      socket.sendRemovedChannel({ id: f.values.removingChannelId });
      if (activeChannelId === f.values.removingChannelId) {
        dispatch(setActiveChannel({ name: firstChannel.name, id: firstChannel.id }));
      }
      f.resetForm();
      onHide();
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title className="p-1">Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead p-1">{network.isOnline ? 'Уверены?' : 'Проверьте подключение к сети!'}</p>
        <form onSubmit={f.handleSubmit}>
          <FormGroup className="d-flex justify-content-start">
            <input ref={inputRef} type="submit" autoComplete="off" className={`btn ${network.isOnline ? 'btn-danger' : 'btn-secondary'}`} value="Удалить" disabled={!network.isOnline} />
            <input onClick={() => onHide()} type="submit" className="me-2 btn btn-secondary ms-2" value="Отменить" />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
