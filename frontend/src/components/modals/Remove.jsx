import React, { useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
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
      try {
        socket.sendRemovedChannel({ id: f.values.removingChannelId });
        toast.success(t('toastify.remove'));
        f.resetForm();
        onHide();
      } catch (error) {
        toast.danger(t('errors.toastifyRemove'));
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title className="p-1">
          {t('modals.removeModal.removeChannel')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead p-1">
          {network.isOnline
            ? t('modals.removeModal.message')
            : t('errors.network')}
        </p>
        <form onSubmit={f.handleSubmit}>
          <div className="d-flex justify-content-start">
            <Button
              ref={inputRef}
              type="submit"
              variant="danger"
              className=""
              disabled={!network.isOnline}
            >
              {t('modals.removeModal.deleteButton')}
            </Button>
            <Button
              onClick={() => onHide()}
              type="button"
              variant="secondary"
              className="ms-2"
            >
              {t('modals.cancelButton')}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
