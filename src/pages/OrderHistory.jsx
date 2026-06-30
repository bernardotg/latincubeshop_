import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import './OrderHistory.css';

const statusConfig = {
  pendiente: { bg: 'rgba(255, 193, 7, 0.15)', color: '#ffc107', label: 'Pendiente' },
  pagado:    { bg: 'rgba(76, 175, 80, 0.15)',  color: '#4caf50', label: 'Pagado' },
  enviado:   { bg: 'rgba(33, 150, 243, 0.15)', color: '#2196f3', label: 'Enviado' },
  entregado: { bg: 'rgba(76, 175, 80, 0.2)',   color: '#4caf50', label: 'Entregado' },
  cancelado: { bg: 'rgba(244, 67, 54, 0.15)',  color: '#f44336', label: 'Cancelado' },
};

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const goHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.href = '/';
  };

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            quantity,
            price_at_time,
            products (name, image_url)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && data) setOrders(data);
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="oh-no-user">
        <div className="oh-no-user-inner">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/>
          </svg>
          <h2>Inicia sesión para ver tus pedidos</h2>
          <p>Crea una cuenta o inicia sesión para acceder a tu historial de compras.</p>
          <div className="oh-no-user-btns">
            <button className="btn btn-primary" onClick={() => setIsLoginOpen(true)}>Iniciar Sesión</button>
            <button className="btn btn-secondary" onClick={goHome}>Volver a la tienda</button>
          </div>
        </div>
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </div>
    );
  }

  return (
    <>
      <Header
        cartCount={0}
        onOpenCart={() => { window.location.href = '/'; }}
        onOpenSearch={() => {}}
        onOpenMobileMenu={() => {}}
        onOpenLogin={() => setIsLoginOpen(true)}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <div className="oh-page container">
        <div className="oh-page-header">
          <div>
            <h1>Mis Pedidos</h1>
            <p className="oh-subtitle">Historial de compras de <strong>{user.email}</strong></p>
          </div>
          {/* Botón "Seguir Comprando" igual al del Logo del Navbar */}
          <button className="btn btn-secondary oh-back-btn" onClick={goHome}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Seguir Comprando
          </button>
        </div>

        {loading ? (
          <div className="oh-loading">
            <div className="oh-spinner"></div>
            <p>Cargando tu historial...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="oh-empty">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <h3>Aún no tienes pedidos</h3>
            <p>Explora nuestro catálogo y realiza tu primera compra.</p>
            <button className="btn btn-primary" onClick={goHome}>Ver productos</button>
          </div>
        ) : (
          <div className="oh-list">
            {orders.map(order => {
              const cfg = statusConfig[order.status] || statusConfig.pendiente;
              return (
                <div key={order.id} className="oh-card">
                  <div className="oh-card-header">
                    <div className="oh-card-meta">
                      <span className="oh-order-id">Pedido #{order.id.split('-')[0].toUpperCase()}</span>
                      <span className="oh-order-date">{new Date(order.created_at).toLocaleDateString('es-VE', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="oh-card-right">
                      <span className="oh-status-badge" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                        {cfg.label}
                      </span>
                      <span className="oh-total">${order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="oh-items">
                    {order.order_items.map((item, idx) => (
                      <div key={idx} className="oh-item">
                        <img
                          src={item.products?.image_url || 'https://via.placeholder.com/50'}
                          alt={item.products?.name}
                          className="oh-item-img"
                        />
                        <div className="oh-item-info">
                          <p className="oh-item-name"><strong>{item.quantity}x</strong> {item.products?.name}</p>
                          <p className="oh-item-price">${item.price_at_time.toFixed(2)} c/u · Subtotal: ${(item.price_at_time * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderHistory;
