import { useState, useEffect } from "react";
import "./Ticker.css";

const Ticker = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    { icon: "🟡", text: "Clock Qiyi — Edición limitda" },
    { icon: "🔴", text: "FTO Oficial WCA — ¡Nuevo!" },
    { icon: "🔵", text: "MoYu Aolong V5 — Envíos a todo Venezuela" },
    { icon: "🟡", text: "Llaveros y Collares — Colección" },
    { icon: "🔴", text: "Pyraminx Weilong — Top de Ventas" },
    { icon: "🔵", text: "Megaminx YJ — El mejor calidad precio" },
    { icon: "🟡", text: "Vin 2x2 al mejor precio — Oferta Limitada" },
    { icon: "🔴", text: "Skewb RS — Compralo ya" },
    { icon: "🔵", text: "Aceptamos USDT · Pago Seguro" },
  ];

  const infiniteItems = [...items, ...items, ...items];

  return (
    <div className={`ticker-wrapper ${isScrolled ? "ticker-scrolled" : ""}`}>
      <div className="ticker-track">
        {infiniteItems.map((item, index) => (
          <div key={index} className="ticker-item">
            <span className="ticker-dot">{item.icon}</span>
            <span className="ticker-text">{item.text}</span>
            <span className="ticker-separator">·</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
