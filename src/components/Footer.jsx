import "./Footer.css";

const Footer = ({ setActiveCategory }) => {
  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    if (setActiveCategory) {
      setActiveCategory(category);
    }
    // Scroll a la grilla de productos
    setTimeout(() => {
      const section = document.getElementById('cubes');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const whatsappLink = "http://wa.link/s7xahi";

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col brand-col">
          <div className="logo footer-logo">
            <span className="logo-latin">LATIN</span>
            <span className="logo-cube">CUBE</span>
            <span className="logo-shop">SHOP</span>
          </div>
          <p className="footer-desc">
            La mejor tienda de speedcubing con envíos a toda la región. Calidad
            premium para romper tus récords.
          </p>
        </div>

        <div className="footer-col">
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li>
              <a href="#cubes" onClick={(e) => handleCategoryClick(e, 'Todos')}>Todos los Puzzles</a>
            </li>
            <li>
              <a href="#cubes" onClick={(e) => handleCategoryClick(e, 'FTO')}>Nuevos Lanzamientos (FTO)</a>
            </li>
            <li>
              <a href="#cubes" onClick={(e) => handleCategoryClick(e, 'Accesorios')}>Accesorios</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Ayuda</h4>
          <ul>
            <li>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Contacto</a>
            </li>
            <li>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Políticas de Envío</a>
            </li>
            <li>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">FAQ</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} LatinCubeShop. Created by Bernardo
          Torres.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
