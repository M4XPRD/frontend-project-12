import React, { useEffect, useRef } from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import useNetwork from '../../hooks/networkHook';

const Remove = ({ socket, onHide, modalInfo }) => {
  const inputRef = useRef();
  const network = useNetwork();
  const { t } = useTranslation();

  const f = useFormik({
    initialValues: {
      removingChannelId: modalInfo.item.id,
    },
    onSubmit: () => {
      socket.sendRemovedChannel({ id: f.values.removingChannelId });
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
        <Modal.Title className="p-1">{t('modals.removeModal.removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead p-1">{network.isOnline ? t('modals.removeModal.message') : t('errors.network')}</p>
        <form onSubmit={f.handleSubmit}>
          <FormGroup className="d-flex justify-content-start">
            <input ref={inputRef} type="submit" autoComplete="off" className={`btn ${network.isOnline ? 'btn-danger' : 'btn-secondary'}`} value={t('modals.removeModal.deleteButton')} disabled={!network.isOnline} />
            <input onClick={() => onHide()} type="submit" className="me-2 btn btn-secondary ms-2" value={t('modals.cancelButton')} />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
