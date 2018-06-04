import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Icon } from 'patternfly-react';
import { connect, store, reduxTypes } from '../../redux/';

const ConfirmationModal = ({
  show,
  title,
  heading,
  body,
  icon,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel
}) => {
  const cancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      store.dispatch({
        type: reduxTypes.confirmationModal.CONFIRMATION_MODAL_HIDE
      });
    }
  };

  return (
    <Modal show={show} onHide={cancel}>
      <Modal.Header>
        <button className="close" onClick={cancel} aria-hidden="true" aria-label="Close">
          <Icon type="pf" name="close" />
        </button>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="confirm-modal-body">
          {icon && <span className="confirm-modal-icon">{icon}</span>}
          <span className="confirm-modal-content">
            <span className="spacer" />
            <div className="confirm-modal-content-heading">{heading}</div>
            <div>{body}</div>
            <span className="spacer" />
          </span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button autoFocus bsStyle="default" className="btn-cancel" onClick={cancel}>
          {cancelButtonText}
        </Button>
        <Button bsStyle="primary" onClick={onConfirm}>
          {confirmButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string,
  heading: PropTypes.node,
  icon: PropTypes.node,
  body: PropTypes.node,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
};

ConfirmationModal.defaultProps = {
  title: 'Confirm',
  heading: null,
  body: null,
  icon: <Icon type="pf" name="warning-triangle-o" />,
  confirmButtonText: 'Confirm',
  cancelButtonText: '',
  onConfirm: null,
  onCancel: null
};

const mapStateToProps = state => ({ ...state.confirmationModal });

const ConnectedConfirmationModal = connect(mapStateToProps)(ConfirmationModal);

export { ConnectedConfirmationModal as default, ConnectedConfirmationModal, ConfirmationModal };
