import { useState } from 'react';
import './Header.css';

const Header = ({ cartCount, onOpenCart, onOpenSearch, onOpenMobileMenu, onOpenLogin, setActiveCategory }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 20);
    });
  }

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Si estamos en /admin o en /mis-pedidos, redirigir al home
    if (window.location.pathname === '/admin' || window.location.pathname === '/mis-pedidos') {
      window.location.href = '/';
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        
        <button className="icon-btn mobile-menu-btn" aria-label="Menú" onClick={onOpenMobileMenu || (() => alert("Menú próximamente"))}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>

        <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <span className="logo-latin">LATIN</span>
          <span className="logo-cube">CUBE</span>
          <span className="logo-shop">SHOP</span>
          <span className="logo-flag" title="Solo disponible en Venezuela" style={{ marginLeft: '8px', fontSize: '1.2rem' }}>🇻🇪</span>
        </div>
        
        <div className="desktop-search-wrapper">
          <div className="desktop-search-bar" onClick={onOpenSearch}>
            <svg className="desktop-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <span className="desktop-search-text">Buscar productos...</span>
            <span className="desktop-search-shortcut">/</span>
          </div>
        </div>
        
        <div className="header-actions">
          <button className="icon-btn search-icon-btn" aria-label="Buscar" onClick={onOpenSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          
          <button className="icon-btn user-btn" aria-label="Usuario" onClick={onOpenLogin}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </button>

          <button className="icon-btn cart-btn" aria-label="Carrito" onClick={onOpenCart}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
