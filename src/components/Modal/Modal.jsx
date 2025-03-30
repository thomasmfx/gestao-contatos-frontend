import './Modal.css';

function Modal({ children, onClose }) {
  return (
    <div onClick={onClose} className="modal">
      {children}
    </div>
  );
}

export default Modal;
