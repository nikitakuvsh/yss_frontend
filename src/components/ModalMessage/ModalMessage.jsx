import { useEffect, useState } from "react";
import './ModalMessage.css';

export default function ModalMessage({ message, isError, onClose, messageError }) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isClosing) {
      const closeTimer = setTimeout(onClose, 500);
      return () => clearTimeout(closeTimer);
    }
  }, [isClosing, onClose]);

  return (
    <div className={`app-toast-message ${isError ? 'app-toast-message--error' : 'app-toast-message--success'} ${isClosing ? 'app-toast-message-close' : ''}`}>
      <div className="app-toast-message-content">
        <span 
          className="app-toast-message-close" 
          onClick={() => setIsClosing(true)}
        >
          &times;
        </span>
        <p>{message}</p>
        {messageError && <p>{messageError}</p>}
      </div>
    </div>
  );
}