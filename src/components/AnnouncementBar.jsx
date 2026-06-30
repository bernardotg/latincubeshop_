import { useState, useEffect } from 'react';
import './AnnouncementBar.css';

const AnnouncementBar = () => {
  // Iniciamos el contador
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Definimos una fecha límite de promoción (ejemplo: 3 días a partir del momento que carga)
    // En producción, podrías pasar esto como prop o traerlo de una base de datos.
    const targetDate = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleScrollToCategories = () => {
    const section = document.getElementById('cubes');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="announcement-bar">
      <div className="container announcement-content">
        <div className="announcement-text">
          <span className="emoji-fire">🔥</span> 5% DE DESCUENTO + OFERTAS
        </div>
        
        <div className="announcement-right">
          <div className="countdown">
            <span className="time-block">{String(timeLeft.days).padStart(2, '0')}d</span> : 
            <span className="time-block">{String(timeLeft.hours).padStart(2, '0')}h</span> : 
            <span className="time-block">{String(timeLeft.minutes).padStart(2, '0')}m</span> : 
            <span className="time-block">{String(timeLeft.seconds).padStart(2, '0')}s</span>
          </div>
          <button className="announcement-btn" onClick={handleScrollToCategories}>
            Comprar Ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
