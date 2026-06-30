import { useState } from "react";
import "./Toast.css";

const Toast = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay que bloquea la interacción con el resto de la página */}
      <div className="toast-overlay" onClick={() => setIsVisible(false)}></div>

      <div className="toast-container animate-fade-in">
        <div className="toast-header">
          <div className="toast-badge">🆕 NOVEDAD</div>
          <button
            className="toast-close"
            onClick={() => setIsVisible(false)}
            aria-label="Cerrar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="toast-body">
          <div className="usdt-logo-wrapper">
            {/* Logo USDT grande */}
            <svg
              viewBox="0 0 24 24"
              width="56"
              height="56"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="12" fill="#26A17B" />
              <path
                fill="#FFF"
                d="M12.923 10.42v1.17c2.45-.067 4.256-.583 4.256-1.21 0-.646-1.936-1.18-4.457-1.18s-4.456.534-4.456 1.18c0 .627 1.805 1.143 4.256 1.21v-1.17zm0 2.183v5.034h-2.146v-5.034c-2.13-.089-3.61-.515-3.61-.998 0-.58 2.07-1.062 4.683-1.062 4.684 0 4.684 1.062 4.684 1.062 0 .483-1.48.91-3.61.998zm5.127-2.215c0 1.125-3.27 2.05-7.072 2.05s-7.073-.925-7.073-2.05 3.27-2.05 7.073-2.05 7.072.925 7.072 2.05z"
              />
            </svg>
          </div>

          <h2 className="toast-title">¡Nuevos métodos de pago!</h2>
          <p className="toast-message">
            Desde ahora recibimos pagos también a través de{" "}
            <strong className="usdt-highlight">USDT</strong>. Más seguridad y
            rapidez para tus compras desde Venezuela.
          </p>
        </div>

        <button className="toast-action-btn" onClick={() => setIsVisible(false)}>
          ¡Entendido!
        </button>
      </div>
    </>
  );
};

export default Toast;
