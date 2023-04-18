import { FC } from "react";
import Modal from "react-modal";
import "./IsSureModal.scss";

Modal.setAppElement("#modal");

interface IModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const IsSureModal: FC<IModalProps> = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <Modal className="modal" overlayClassName="modal__overlay" isOpen={isOpen}>
      <div className="modal-content">
        <h2 className="modal__info">are you sure?</h2>
        <button className="modal__btn" onClick={onCancel}>
          NO NO NO!!
        </button>
        <button className="modal__btn" onClick={onConfirm}>
          DELETE
        </button>
      </div>
    </Modal>
  );
};

export default IsSureModal;
