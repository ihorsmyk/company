import Modal from "react-modal";
import "./IsSureModal.scss";

Modal.setAppElement("#modal");

interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const IsSureModal: React.FC<ModalProps> = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <Modal className="modal" overlayClassName="modal__overlay" isOpen={isOpen}>
      <div className="modal-content">
        <h2>confirm deletion</h2>
        <button onClick={onCancel}>no no no!!</button>
        <button onClick={onConfirm}>delete</button>
      </div>
    </Modal>
  );
};

export default IsSureModal;
