import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartId, setCartId] = useState(null);

  // Cargar el carrito desde Supabase si el usuario está autenticado, 
  // o desde localStorage si es invitado.
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      if (user) {
        // Usuario logueado: buscar su carrito en Supabase
        const { data: cartData, error: cartError } = await supabase
          .from('carts')
          .select('id')
          .eq('user_id', user.id)
          .single();

        let currentCartId = null;

        if (cartError && cartError.code === 'PGRST116') {
          // No existe carrito para este usuario, crearlo
          const { data: newCart, error: insertError } = await supabase
            .from('carts')
            .insert({ user_id: user.id })
            .select()
            .single();
            
          if (!insertError) {
            currentCartId = newCart.id;
          }
        } else if (cartData) {
          currentCartId = cartData.id;
        }

        setCartId(currentCartId);

        if (currentCartId) {
          // Obtener los items del carrito con la info del producto
          const { data: items, error: itemsError } = await supabase
            .from('cart_items')
            .select(`
              id,
              quantity,
              product_id,
              products (*)
            `)
            .eq('cart_id', currentCartId);

          if (!itemsError && items) {
            // Transformar la data al formato esperado por el frontend
            const formattedItems = items.map(item => ({
              ...item.products,
              cart_item_id: item.id, // ID en la tabla cart_items
              quantity: item.quantity
            }));
            setCartItems(formattedItems);
          }
        }
      } else {
        // Invitado: Cargar de localStorage
        const localCart = localStorage.getItem('latinCubeCart');
        if (localCart) {
          try {
            setCartItems(JSON.parse(localCart));
          } catch (e) {
            setCartItems([]);
          }
        } else {
          setCartItems([]);
        }
        setCartId(null);
      }
      setLoading(false);
    };

    fetchCart();
  }, [user]);

  // Guardar en localStorage si es invitado
  useEffect(() => {
    if (!user) {
      localStorage.setItem('latinCubeCart', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = async (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (user && cartId) {
      // Guardar en Supabase
      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;
        await supabase
          .from('cart_items')
          .update({ quantity: newQuantity })
          .eq('id', existingItem.cart_item_id);
          
        setCartItems(prev => prev.map(item => 
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        ));
      } else {
        const { data: newItem, error } = await supabase
          .from('cart_items')
          .insert({
            cart_id: cartId,
            product_id: product.id,
            quantity: 1
          })
          .select()
          .single();

        if (!error && newItem) {
          setCartItems(prev => [...prev, { ...product, quantity: 1, cart_item_id: newItem.id }]);
        }
      }
    } else {
      // Guardar localmente
      if (existingItem) {
        setCartItems(prev => prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else {
        setCartItems(prev => [...prev, { ...product, quantity: 1 }]);
      }
    }
  };

  const updateQuantity = async (productId, amount) => {
    const item = cartItems.find(i => i.id === productId);
    if (!item) return;

    const newQuantity = item.quantity + amount;

    if (newQuantity <= 0) {
      return removeItem(productId);
    }

    if (user && cartId) {
      await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', item.cart_item_id);
    }

    setCartItems(prev => prev.map(i => 
      i.id === productId ? { ...i, quantity: newQuantity } : i
    ));
  };

  const removeItem = async (productId) => {
    const item = cartItems.find(i => i.id === productId);
    if (!item) return;

    if (user && cartId) {
      await supabase
        .from('cart_items')
        .delete()
        .eq('id', item.cart_item_id);
    }

    setCartItems(prev => prev.filter(i => i.id !== productId));
  };

  const clearCart = async () => {
    if (user && cartId) {
      await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cartId);
    }
    setCartItems([]);
  };

  const cartTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      loading,
      cartTotalCount,
      cartTotalPrice,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
