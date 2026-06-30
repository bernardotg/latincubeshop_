import './MobileMenu.css';

const MobileMenu = ({ isOpen, onClose, onSelectCategory, categories = [] }) => {
  if (!isOpen) return null;

  const handleCategoryClick = (category) => {
    onSelectCategory(category);
    onClose();
    
    // Hacemos scroll suave hacia la sección de productos
    setTimeout(() => {
      const section = document.getElementById('cubes');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <div className="mobile-menu-overlay animate-fade-in" onClick={onClose}></div>
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="logo">
            <span className="logo-latin">LATIN</span>
            <span className="logo-cube">CUBE</span>
            <span className="logo-shop">SHOP</span>
          </div>
          <button className="close-menu-btn" onClick={onClose} aria-label="Cerrar Menú">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div className="mobile-menu-body">
          <h3>Categorías</h3>
          <ul className="mobile-category-list">
            {categories.map(cat => (
              <li key={cat}>
                <button 
                  className="mobile-category-btn" 
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
