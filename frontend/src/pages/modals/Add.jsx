import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { setActiveChannel } from '../../store/activeChannelSlice';

const Add = ({ socket, onHide }) => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.chat.chatInfo);

  const channelNameSchema = yup.object().shape({
    channelName: yup
      .string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .test('is-unique', 'Должно быть уникальным', (channelName) => !channels.some((channel) => channel.name === channelName))
      .required('Обязательное поле'),
  });
  const f = useFormik({
    initialValues: {
      channelName: '',
      channelId: _.uniqueId(),
    },
    validationSchema: channelNameSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: () => {
      socket.sendChannel({ name: f.values.channelName });
      dispatch(setActiveChannel({ name: f.values.channelName, id: f.values.channelId }));
      onHide();
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={f.handleSubmit} noValidate>
          <FormGroup>
            <FormControl
              required
              className={`mb-2 form-control ${f.errors.channelName ? 'is-invalid' : ''}`}
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.channelName}
              data-testid="input-body"
              name="channelName"
            />
            {f.touched.channelName && f.errors.channelName && (
            <div className="invalid-feedback mb-2">
              {f.errors.channelName}
            </div>
            )}
          </FormGroup>
          <FormGroup className="d-flex justify-content-start">
            <input type="submit" className="btn btn-primary" value="Добавить" />
            <input onClick={() => onHide()} type="submit" className="me-2 btn btn-secondary ms-2" value="Отменить" />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
