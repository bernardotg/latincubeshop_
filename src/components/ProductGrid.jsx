import ProductCard from "./ProductCard";
import "./ProductGrid.css";

const ProductGrid = ({ onAddToCart, activeCategory, setActiveCategory, products = [], categories = [] }) => {
  const filteredProducts =
    activeCategory === "Todos"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="product-section" id="cubes">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Novedades</h2>

          <div className="category-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="product-grid animate-fade-in">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => onAddToCart(product)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
