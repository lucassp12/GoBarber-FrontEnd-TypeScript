import React, { useEffect } from 'react';

import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  sucess: <FiCheckCircle size={24} />,
};

interface ToastProps {
  toast: ToastMessage;
  style: object;
}

const Toast: React.FC<ToastProps> = ({ toast, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, toast.id]);

  return (
    <Container
      style={style}
      type={toast.type}
      hasDescription={!!toast.description}
    >
      {icons[toast.type] || 'info'}
      <div>
        <strong>{toast.title}</strong>
        {toast.description && <p>{toast.description}</p>}
        <button type="button" onClick={() => removeToast(toast.id)}>
          <FiXCircle size={18} />
        </button>
      </div>
    </Container>
  );
};

export default Toast;
