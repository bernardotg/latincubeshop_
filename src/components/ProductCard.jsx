import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        {product.is_new && (
          <span className="badge badge-new product-badge">
            NUEVO
          </span>
        )}
        <img src={product.image_url || product.image} alt={product.name} className="product-image" loading="lazy" />
        
        <div className="product-hover-actions">
          <button className="btn-quick-add" aria-label="Añadir rápido" onClick={(e) => {
            e.stopPropagation();
            if (onAddToCart) onAddToCart();
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
        </div>
      </div>
      
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
