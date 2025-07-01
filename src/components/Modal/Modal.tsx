import { ReactNode, useEffect, useRef, MouseEvent, KeyboardEvent } from 'react';
import './Modal.css';

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

function Modal({ children, onClose }: Readonly<ModalProps>) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (dialogElement) {
      dialogElement.showModal();
      dialogElement.addEventListener('close', onClose);
      
      return () => {
        dialogElement.removeEventListener('close', onClose);
      };
    }
  }, [onClose]);

  const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      className="modal"
    >
      {children}
    </dialog>
  );
}

export default Modal;