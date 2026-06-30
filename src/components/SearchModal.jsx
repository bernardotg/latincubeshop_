import { useState, useEffect, useRef } from 'react';
import './SearchModal.css';

const SearchModal = ({ onClose, onAddToCart, products = [], setActiveCategory }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  const categories = [
    "Todos", "FTO", "2x2", "3x3", "4x4", "5x5", "6x6", "7x7",
    "Pyraminx", "Megaminx", "Square-1", "Skewb", "Clock", "Llaveros", "Accesorios"
  ];

  // Auto-focus al input al abrir el modal
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Lógica de búsqueda
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) || 
      product.category.toLowerCase().includes(lowercaseQuery)
    );
    setResults(filtered);
  }, [query, products]);

  const handleCategoryClick = (category) => {
    onClose();
    
    if (setActiveCategory) {
      setActiveCategory(category);
    }

    // Pequeño delay para que el modal cierre antes de hacer scroll
    setTimeout(() => {
      const section = document.getElementById('cubes');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="search-overlay animate-fade-in">
      <div className="search-modal">
        
        <div className="search-header">
          <div className="search-input-container">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Buscar por nombre o categoría (ej: GAN, 3x3)..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
            {query && (
              <button className="clear-btn" onClick={() => setQuery('')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
              </button>
            )}
          </div>
          <button className="close-search-btn" onClick={onClose}>Cancelar</button>
        </div>

        <div className="search-body">
          {query.trim() === '' ? (
            <div className="search-suggestions">
              <h3>Categorías Populares</h3>
              <div className="suggestions-grid">
                {categories.filter(c => c !== "Todos").slice(0, 8).map(cat => (
                  <button key={cat} className="suggestion-pill" onClick={() => handleCategoryClick(cat)}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="search-results">
              <h3>Resultados ({results.length})</h3>
              <div className="results-list">
                {results.map(product => (
                  <div key={product.id} className="result-item">
                    <img src={product.image_url || product.image} alt={product.name} />
                    <div className="result-info">
                      <h4>{product.name}</h4>
                      <span>${product.price.toFixed(2)}</span>
                    </div>
                    <button 
                      className="btn-quick-add" 
                      onClick={() => {
                        onAddToCart(product);
                        onClose(); // Cerramos al añadir
                      }}
                      title="Añadir al carrito"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="no-results">
              <p>No se encontraron productos para "{query}"</p>
              <span>Intenta con otros términos como "Moyu", "GAN" o "3x3".</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
