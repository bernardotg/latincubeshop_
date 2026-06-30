import "./PremiumCarousel.css";

// IMPORTANTE: Asegúrate de que la ruta y los nombres (1.jpg, 2.jpg...) coincidan con la carpeta que creaste.
// Si los guardaste con otros nombres (ej. fto.png), simplemente cambia el texto entre comillas aquí.
import img1 from '../assets/carousel/1.jpg'; 
import img2 from '../assets/carousel/2.jpg';
import img3 from '../assets/carousel/3.jpg';
import img4 from '../assets/carousel/4.jpg';
import img5 from '../assets/carousel/5.jpg';

const PremiumCarousel = ({ setActiveCategory }) => {
  const handleGoToFTO = () => {
    if (setActiveCategory) {
      setActiveCategory('FTO');
    }
    // Hacemos scroll suave hacia la sección de productos
    setTimeout(() => {
      const section = document.getElementById('cubes');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Un arreglo con imágenes de cubos de alta gama. El primero será el FTO.
  const carouselImages = [
    {
      id: "fto",
      url: img1,
      isSpecial: true,
      text: "NUEVO OFICIAL WCA: FTO",
      subtext: "¡Sé el primero en dominarlo!",
    },
    {
      id: "cube1",
      url: img2,
    },
    {
      id: "cube2",
      url: img3,
    },
    {
      id: "cube3",
      url: img4,
    },
    {
      id: "cube4",
      url: img5,
    },
  ];

  // Duplicamos el arreglo para que el efecto "Marquee" (cinta sin fin) funcione sin cortes visuales.
  const infiniteItems = [
    ...carouselImages,
    ...carouselImages,
    ...carouselImages,
  ];

  return (
    <section className="premium-carousel-section">
      <div className="carousel-header">
        <h3>Equipamiento de Élite</h3>
        <p>Los rompecabezas más deseados del mundo de la competición.</p>
      </div>

      <div className="carousel-container">
        {/* Contenedor que se desplaza infinitamente */}
        <div className="carousel-track">
          {infiniteItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`carousel-card ${item.isSpecial ? "special-fto-card" : ""}`}
            >
              <img src={item.url} alt="Cubo Premium" loading="lazy" />

              {item.isSpecial && (
                <div className="special-fto-overlay animate-pulse">
                  <span className="fto-badge">NUEVO</span>
                  <h4>{item.text}</h4>
                  <p>{item.subtext}</p>
                  <button className="btn-buy-fto" onClick={handleGoToFTO}>¡Comprar Ya!</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumCarousel;
