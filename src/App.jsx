import { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import PremiumCarousel from './components/PremiumCarousel';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import Toast from './components/Toast';
import CartModal from './components/CartModal';
import SearchModal from './components/SearchModal';
import MobileMenu from './components/MobileMenu';
import AnnouncementBar from './components/AnnouncementBar';
import Ticker from './components/Ticker';
import LoginModal from './components/LoginModal';
import AdminPanel from './pages/AdminPanel';
import OrderHistory from './pages/OrderHistory';
import { supabase } from './lib/supabase';
import { useCart } from './context/CartContext';
import './index.css';

function App() {
  const { cartItems, addToCart, cartTotalCount } = useCart();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdminRoute = window.location.pathname === '/admin';
  const isOrderHistoryRoute = window.location.pathname === '/mis-pedidos';

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false });
      
      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Escuchar evento disparado desde CartModal cuando un invitado quiere ver pedidos
  useEffect(() => {
    const handleOpenLogin = () => {
      setIsCartOpen(false);
      setIsLoginOpen(true);
    };
    window.addEventListener('open-login', handleOpenLogin);
    return () => window.removeEventListener('open-login', handleOpenLogin);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  // Categorías fijas para el UI (o podrías derivarlas de los productos)
  const categories = [
    "Todos", "FTO", "2x2", "3x3", "4x4", "5x5", "6x6", "7x7",
    "Pyraminx", "Megaminx", "Square-1", "Skewb", "Clock", "Llaveros", "Accesorios"
  ];

  if (isAdminRoute) {
    return (
      <>
        <Header 
          cartCount={cartTotalCount} 
          onOpenCart={() => setIsCartOpen(true)} 
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenLogin={() => setIsLoginOpen(true)}
          setActiveCategory={setActiveCategory}
        />
        <AdminPanel />
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </>
    );
  }

  if (isOrderHistoryRoute) {
    return <OrderHistory />;
  }

  return (
    <>
      <AnnouncementBar />
      <Header 
        cartCount={cartTotalCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        setActiveCategory={setActiveCategory}
      />
      <Ticker />
      <Toast />
      
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        onSelectCategory={setActiveCategory}
        categories={categories}
      />
      
      {isSearchOpen && (
        <SearchModal 
          onClose={() => setIsSearchOpen(false)} 
          onAddToCart={handleAddToCart}
          products={products}
          setActiveCategory={setActiveCategory}
        />
      )}
      
      {isCartOpen && (
        <CartModal 
          onClose={() => setIsCartOpen(false)} 
        />
      )}
      
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <main>
        <HeroBanner />
        <PremiumCarousel setActiveCategory={setActiveCategory} products={products} />
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px', color: 'white' }}>Cargando catálogo...</div>
        ) : (
          <ProductGrid 
            onAddToCart={addToCart} 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
            products={products}
            categories={categories}
          />
        )}
      </main>
      <Footer setActiveCategory={setActiveCategory} />
    </>
  );
}

export default App;
