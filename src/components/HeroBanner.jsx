import './HeroBanner.css';

const HeroBanner = () => {
  const handleScrollToCategories = () => {
    const section = document.getElementById('cubes');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      {/* Fondo con imagen de altísima calidad y efecto Ken Burns (Zoom lento) */}
      <div className="hero-bg"></div>
      
      {/* Superposición oscura para garantizar legibilidad */}
      <div className="hero-overlay"></div>

      {/* Partículas/Formas desenfocadas flotando en el fondo */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="container hero-content-wrapper">
        <div className="hero-glass-panel animate-fade-up">
          <h1>Eleva tu nivel con <span className="highlight-gradient">LatinCubeShop</span></h1>
          <p className="hero-subtitle">
            Equípate con los rompecabezas más deseados del mundo de la competición. Preparados, lubricados y listos para romper tus récords personales.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary btn-glow" onClick={handleScrollToCategories}>
              Comprar Ahora
            </button>
            <button className="btn btn-secondary" onClick={handleScrollToCategories}>
              Ver Novedades
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
