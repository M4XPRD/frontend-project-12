import React from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveChannel } from '../../store/activeChannelSlice';
import { removeMessages } from '../../store/messagesSlice';

const Remove = ({ socket, onHide, modalInfo }) => {
  const activeChannelId = useSelector((state) => state.channel.activeChannel).id;
  const messages = useSelector((state) => state.messages.allMessages);
  const dispatch = useDispatch();

  const f = useFormik({
    initialValues: {
      removingChannelId: modalInfo.item.id,
    },
    onSubmit: () => {
      socket.sendRemovedChannel({ id: f.values.removingChannelId });
      if (activeChannelId === f.values.removingChannelId) {
        dispatch(setActiveChannel({ name: 'general', id: 1 }));
      }
      dispatch(removeMessages({ id: f.values.removingChannelId }));
      f.resetForm();
      onHide();
    },
  });

  console.log(messages);
  console.log(f.values.removingChannelId);
  console.log(activeChannelId);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title className="p-1">Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead p-1">Уверены?</p>
        <form onSubmit={f.handleSubmit}>
          <FormGroup className="d-flex justify-content-start">
            <input type="submit" className="btn btn-danger" value="Удалить" />
            <input onClick={() => onHide()} type="submit" className="me-2 btn btn-secondary ms-2" value="Отменить" />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
