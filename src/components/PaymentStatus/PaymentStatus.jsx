import './PaymentStatus.css';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';

import animationFailed from './animations/Failed.json';
import animationSuccess from './animations/Success.json';
import animationPending from './animations/Pending.json';

export default function PaymentStatus() {
  const [status, setStatus] = useState('pending');
  const navigate = useNavigate();

  const statusConfig = {
    success: {
      text: 'Оплата прошла успешно',
      animation: animationSuccess
    },
    failed: {
      text: 'Оплата не удалась',
      animation: animationFailed
    },
    pending: {
      text: 'Проверяем платёж...',
      animation: animationPending
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const randomStatus = Math.random() > 0.5 ? 'success' : 'failed';
      setStatus(randomStatus);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const current = statusConfig[status];

  return (
    <main className="payment-status">
      <div className="payment-status__content">

        <div className="payment-status__animation">
          <Lottie
            key={status} 
            animationData={current.animation}
            loop={status != 'failed'}
          />
        </div>

        <h1 className={`payment-status__title payment-status__title--${status}`}>
          {current.text}
        </h1>

        {status == 'success' && (
            <button className='payment-status__button button--redirect' onClick={() => navigate('/orders')}>Перейти в мои заказы</button>
        )}

      </div>
    </main>
  );
}
