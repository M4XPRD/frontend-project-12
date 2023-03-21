import React, { useEffect, useRef } from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveChannel } from '../../store/activeChannelSlice';

const Remove = ({ socket, onHide, modalInfo }) => {
  const activeChannelId = useSelector((state) => state.channel.activeChannel).id;
  const channels = useSelector((state) => state.chat.chatInfo);
  const [firstChannel] = channels;
  const dispatch = useDispatch();
  const inputRef = useRef();

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
        <p className="lead p-1">Уверены?</p>
        <form onSubmit={f.handleSubmit}>
          <FormGroup className="d-flex justify-content-start">
            <input ref={inputRef} type="submit" className="btn btn-danger" value="Удалить" />
            <input onClick={() => onHide()} type="submit" className="me-2 btn btn-secondary ms-2" value="Отменить" />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
