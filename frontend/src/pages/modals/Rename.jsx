import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

const Rename = ({ socket, onHide, modalInfo }) => {
  const inputRef = useRef();
  const channels = useSelector((state) => state.chat.chatInfo);

  const channelRenameSchema = yup.object().shape({
    newChannelName: yup
      .string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .test('is-unique', 'Должно быть уникальным', (newChannelName) => !channels.some((channel) => channel.name === newChannelName))
      .required('Обязательное поле'),
  });

  const f = useFormik({
    initialValues: {
      newChannelName: '',
      channelId: modalInfo.item.id,
      channelRemovable: modalInfo.item.removable,
    },
    validationSchema: channelRenameSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: () => {
      const newData = {
        name: f.values.newChannelName,
        id: f.values.channelId,
        removable: f.values.channelRemovable,
      };
      socket.sendRenamedChannel(newData);
      f.resetForm();
      onHide();
    },
  });

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title className="p-1">Переименовать канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={f.handleSubmit} noValidate>
          <FormGroup>
            <FormControl
              required
              className={`mb-2 form-control ${f.errors.newChannelName ? 'is-invalid' : ''}`}
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.newChannelName}
              data-testid="input-body"
              name="newChannelName"
            />
            {f.touched.newChannelName && f.errors.newChannelName && (
            <div className="invalid-feedback mb-2">
              {f.errors.newChannelName}
            </div>
            )}
          </FormGroup>
          <FormGroup className="d-flex justify-content-start mt-3">
            <input type="submit" className="btn btn-primary" value="Отправить" />
            <input onClick={() => onHide()} type="submit" className="me-2 btn btn-secondary ms-2" value="Отменить" />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
