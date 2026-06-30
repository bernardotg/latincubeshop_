import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import './CartModal.css';

const CartModal = ({ onClose }) => {
  const { cartItems, updateQuantity, removeItem, clearCart, cartTotalPrice } = useCart();
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleGoToOrders = () => {
    onClose();
    if (user) {
      window.location.href = '/mis-pedidos';
    } else {
      // Si no está registrado, disparamos un evento para que App.jsx abra el LoginModal
      window.dispatchEvent(new CustomEvent('open-login'));
    }
  };
  
  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setIsCheckingOut(true);

    try {
      if (user) {
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({ user_id: user.id, total: cartTotalPrice, status: 'pendiente' })
          .select()
          .single();

        if (orderError) throw orderError;

        for (const item of cartItems) {
          await supabase.from('order_items').insert({
            order_id: order.id,
            product_id: item.id,
            quantity: item.quantity,
            price_at_time: item.price
          });

          const { data: pData } = await supabase.from('products').select('stock').eq('id', item.id).single();
          if (pData) {
            await supabase.from('products').update({ stock: Math.max(0, pData.stock - item.quantity) }).eq('id', item.id);
          }
        }
      }

      const intro = "¡Hola LatinCubeShop! Quiero realizar el siguiente pedido:%0A%0A";
      const itemsText = cartItems.map(item => `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})`).join('%0A');
      const totalText = `%0A%0ATotal: $${cartTotalPrice.toFixed(2)}`;
      const userText = user ? `%0A%0AEmail: ${user.email}` : '%0A%0A(Invitado)';
      const message = intro + itemsText + totalText + userText;

      await clearCart();
      window.open(`https://wa.me/584245630557?text=${message}`, '_blank');
      onClose();
      
    } catch (error) {
      console.error("Error durante el checkout:", error);
      alert("Hubo un error procesando tu pedido.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <div className="cart-overlay animate-fade-in" onClick={onClose}></div>
      <div className="cart-modal">
        <div className="cart-header">
          <h2>Tu Carrito</h2>
          <div className="cart-header-actions">
            <button
              className="cart-orders-btn"
              onClick={handleGoToOrders}
              title={user ? 'Ver mis pedidos' : 'Inicia sesión para ver tus pedidos'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
                <rect x="9" y="3" width="6" height="4" rx="1"/>
                <path d="M9 12h6M9 16h4"/>
              </svg>
              {user ? 'Mis Pedidos' : 'Inicia sesión'}
            </button>
            <button className="cart-close-btn" onClick={onClose} aria-label="Cerrar Carrito">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Tu carrito está vacío.</p>
              <button className="btn btn-secondary" onClick={onClose}>Seguir Comprando</button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image_url || item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  <div className="cart-item-controls">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}>-</button>
                    <span className="qty-display">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total Estimado:</span>
              <span>${cartTotalPrice.toFixed(2)}</span>
            </div>
            <button
              className="btn btn-primary btn-checkout"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Procesando...' : 'Comprar por WhatsApp'}
              <svg style={{marginLeft: '8px'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartModal;
