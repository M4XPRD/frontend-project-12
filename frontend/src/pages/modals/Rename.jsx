import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import useNetwork from '../../hooks/networkHook';

const Rename = ({ socket, onHide, modalInfo }) => {
  const network = useNetwork();
  const inputRef = useRef();
  const channels = useSelector((state) => state.channels.allChannels);
  const { t } = useTranslation();

  const channelRenameSchema = yup.object().shape({
    newChannelName: yup
      .string()
      .min(3, 'errors.symbolsLength')
      .max(20, 'errors.symbolsLength')
      .test('is-unique', 'errors.mustBeUnique', (newChannelName) => !channels.some((channel) => channel.name === newChannelName))
      .required('errors.requiredField'),
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
        <Modal.Title className="p-1">{t('modals.renameModal.renameChannel')}</Modal.Title>
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
              value={network.isOnline ? f.values.newChannelName : t('errors.network')}
              autoComplete="off"
              data-testid="input-body"
              name="newChannelName"
            />
            {f.touched.newChannelName && f.errors.newChannelName && (
            <div className="invalid-feedback mb-2">
              {t(f.errors.newChannelName)}
            </div>
            )}
          </FormGroup>
          <FormGroup className="d-flex justify-content-start mt-3">
            <input type="submit" className={`btn ${network.isOnline ? 'btn-primary' : 'btn-secondary'}`} value={t('modals.renameModal.renameButton')} disabled={!network.isOnline} />
            <input onClick={() => onHide()} type="submit" className="me-2 btn btn-secondary ms-2" value={t('modals.cancelButton')} />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
