import React from 'react';

const Modal = ({ isOpen, message, onConfirm, onCancel }: {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal">
        <div className="modal-content">
          <p>{message}</p>
          <div className='modal-content-buttons'>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel}>Cancel</button>
          </div>       
        </div>
      </div>
    );
  };
  
  export default Modal;