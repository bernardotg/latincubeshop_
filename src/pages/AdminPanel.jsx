import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { products as oldProducts } from '../data/products.js';
import './AdminPanel.css';

const AdminPanel = () => {
  const { user, isAdmin, signOut } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [migrationStatus, setMigrationStatus] = useState('');
  
  // Form states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('3x3');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const [isNew, setIsNew] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [activeTab, setActiveTab] = useState('productos'); // 'productos' o 'pedidos'
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false });
      
    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        auth:user_id (email),
        order_items (
          product_id,
          quantity,
          price_at_time,
          products (name, image_url)
        )
      `)
      .order('created_at', { ascending: false });
      
    if (!error && data) {
      setOrders(data);
    } else if (error) {
      console.error("Error fetching orders:", error);
    }
    setLoadingOrders(false);
  };

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchOrders();
    }
  }, [isAdmin]);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const orderToUpdate = orders.find(o => o.id === orderId);
      if (!orderToUpdate) return;

      if (newStatus === 'cancelado' && orderToUpdate.status !== 'cancelado') {
        const confirmRestore = window.confirm("¿Deseas devolver los productos de este pedido al inventario?");
        if (confirmRestore) {
          for (const item of orderToUpdate.order_items) {
             if (!item.product_id) continue;
             const { data: pData } = await supabase.from('products').select('stock').eq('id', item.product_id).single();
             if (pData) {
               await supabase.from('products').update({ stock: pData.stock + item.quantity }).eq('id', item.product_id);
             }
          }
          fetchProducts(); // Update product list in the background
        }
      }

      if (orderToUpdate.status === 'cancelado' && newStatus !== 'cancelado') {
         window.alert("Nota: Cambiar un pedido de 'Cancelado' a otro estado no descontará el inventario automáticamente.");
      }

      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);
      
      if (error) throw error;
      
      // Update local state
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert("Error actualizando pedido: " + err.message);
    }
  };

  if (!isAdmin) {
    return (
      <div className="admin-unauthorized">
        <h2>Acceso Denegado</h2>
        <p>Solo los administradores pueden ver esta página.</p>
        {user && <button className="btn btn-secondary" onClick={signOut}>Cerrar Sesión</button>}
      </div>
    );
  }

  const resetForm = () => {
    setName('');
    setPrice('');
    setCategory('3x3');
    setDescription('');
    setStock(0);
    setIsNew(false);
    setImageFile(null);
    setImagePreview('');
    setIsEditing(false);
    setCurrentProduct(null);
  };

  const handleEditClick = (prod) => {
    setIsEditing(true);
    setCurrentProduct(prod);
    setName(prod.name);
    setPrice(prod.price);
    setCategory(prod.category);
    setDescription(prod.description || '');
    setStock(prod.stock || 0);
    setIsNew(prod.is_new || false);
    setImagePreview(prod.image_url || '');
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file, forceName = null) => {
    const fileExt = file.name ? file.name.split('.').pop() : 'jpg';
    const fileName = forceName || `${Math.random()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const runMigration = async () => {
    if (!window.confirm("¿Seguro que quieres migrar los 49 productos? Esto puede tardar 1 o 2 minutos.")) return;
    
    setMigrationStatus('Iniciando migración...');
    let successCount = 0;
    let errors = [];
    
    for (const prod of oldProducts) {
      setMigrationStatus(`Migrando (${successCount}/${oldProducts.length}): ${prod.name}`);
      try {
        let imageUrl = prod.image; // fallback a la imagen local

        try {
          const response = await fetch(prod.image);
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const blob = await response.blob();
          
          const parts = prod.image.split('/');
          const originalFilename = parts[parts.length - 1].split('?')[0] || `product-${Math.random()}.jpg`;
          
          imageUrl = await uploadImage(blob, originalFilename);
        } catch (imgErr) {
          console.warn(`No se pudo subir imagen de ${prod.name}, usando URL local:`, imgErr.message);
        }
        
        const productData = {
          name: prod.name,
          price: prod.price,
          category: prod.category,
          is_new: prod.isNew || false,
          stock: 10,
          image_url: imageUrl
        };
        
        const { error: insertError } = await supabase.from('products').insert([productData]);
        if (insertError) throw insertError;
        
        successCount++;
      } catch (err) {
        console.error("Error migrando " + prod.name, err);
        errors.push(`${prod.name}: ${err.message}`);
      }
    }
    
    if (errors.length > 0) {
      console.error("Errores durante la migración:", errors);
      setMigrationStatus(`Completado: ${successCount} exitosos, ${errors.length} fallidos. Revisa la consola (F12) para ver detalles.`);
    } else {
      setMigrationStatus(`✅ Migración completada. ${successCount} productos subidos exitosamente.`);
    }
    fetchProducts();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = imagePreview;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const productData = {
        name,
        price: parseFloat(price),
        category,
        description,
        stock: parseInt(stock),
        is_new: isNew,
        image_url: imageUrl,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', currentProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);
        if (error) throw error;
      }

      alert('¡Producto guardado exitosamente!');
      resetForm();
      fetchProducts();
    } catch (error) {
      alert('Error guardando producto: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);
        if (error) throw error;
        
        fetchProducts();
      } catch (error) {
        alert('Error eliminando: ' + error.message);
      }
    }
  };

  return (
    <div className="admin-panel container">
      <div className="admin-header">
        <h2>Panel de Administración</h2>
        <div className="admin-actions">
          <span>Hola, {user.email}</span>
          <button className="btn btn-secondary" onClick={signOut}>Salir</button>
        </div>
      </div>
      
      <div className="admin-tabs">
        <button 
          className={`btn ${activeTab === 'productos' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('productos')}
        >
          Gestionar Productos
        </button>
        <button 
          className={`btn ${activeTab === 'pedidos' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('pedidos')}
        >
          Gestionar Pedidos
        </button>
      </div>
      
      {activeTab === 'productos' && (
        <>
          {migrationStatus && <div className="success-msg" style={{marginBottom: '20px'}}>{migrationStatus}</div>}
          
          <div className="admin-grid">
            <div className="admin-form-container">
              <h3>{isEditing ? 'Editar Producto' : 'Añadir Producto'}</h3>
              <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                  <label>Nombre del Producto</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Precio ($)</label>
                    <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Categoría</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} required>
                      <option value="FTO">FTO</option>
                      <option value="2x2">2x2</option>
                      <option value="3x3">3x3</option>
                      <option value="4x4">4x4</option>
                      <option value="5x5">5x5</option>
                      <option value="6x6">6x6</option>
                      <option value="7x7">7x7</option>
                      <option value="Pyraminx">Pyraminx</option>
                      <option value="Megaminx">Megaminx</option>
                      <option value="Square-1">Square-1</option>
                      <option value="Skewb">Skewb</option>
                      <option value="Clock">Clock</option>
                      <option value="Llaveros">Llaveros</option>
                      <option value="Accesorios">Accesorios</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Stock</label>
                    <input type="number" value={stock} onChange={e => setStock(e.target.value)} />
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input type="checkbox" checked={isNew} onChange={e => setIsNew(e.target.checked)} />
                      ¿Es Nuevo (Etiqueta)?
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Imagen del Producto</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                  {imagePreview && <img src={imagePreview} alt="Preview" className="img-preview" />}
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">{isEditing ? 'Actualizar' : 'Guardar Producto'}</button>
                  {isEditing && <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancelar</button>}
                </div>
              </form>
            </div>

            <div className="admin-list-container">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h3>Tus Productos ({products.length})</h3>
                {products.length === 0 && (
                   <button className="btn btn-primary" onClick={runMigration} style={{backgroundColor: '#26A17B', padding: '5px 10px', fontSize: '0.9rem'}}>
                      🚀 Migrar 49
                   </button>
                )}
              </div>
              {loading ? (
                <p>Cargando productos...</p>
              ) : (
                <div className="product-list">
                  {products.map(prod => (
                    <div key={prod.id} className="admin-product-card">
                      <img src={prod.image_url} alt={prod.name} />
                      <div className="prod-info">
                        <h4>{prod.name}</h4>
                        <p>${prod.price} | {prod.category}</p>
                      </div>
                      <div className="prod-actions">
                        <button className="edit-btn" onClick={() => handleEditClick(prod)}>✏️</button>
                        <button className="delete-btn" onClick={() => handleDelete(prod.id)}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {activeTab === 'pedidos' && (
        <div className="admin-orders-container" style={{ backgroundColor: 'var(--bg-card)', padding: '20px', borderRadius: '12px' }}>
          <h3>Todos los Pedidos</h3>
          {loadingOrders ? (
            <p>Cargando pedidos...</p>
          ) : orders.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', marginTop: '20px' }}>No hay pedidos registrados aún.</p>
          ) : (
            <div className="admin-orders-table-wrapper">
              <table className="admin-orders-table">
                <thead>
                  <tr>
                    <th>ID / Fecha</th>
                    <th>Cliente</th>
                    <th>Productos</th>
                    <th>Total</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', fontFamily: 'monospace' }}>{order.id.split('-')[0].toUpperCase()}</span>
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.auth?.email || 'N/A'}</td>
                      <td>
                        <ul style={{ margin: 0, paddingLeft: '14px', fontSize: '0.88rem' }}>
                          {order.order_items.map((item, idx) => (
                            <li key={idx}>{item.quantity}x {item.products?.name}</li>
                          ))}
                        </ul>
                      </td>
                      <td style={{ fontWeight: 'bold', color: 'var(--accent-yellow)' }}>${order.total.toFixed(2)}</td>
                      <td>
                        <select 
                          className="order-status-select"
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="pagado">Pagado</option>
                          <option value="enviado">Enviado</option>
                          <option value="entregado">Entregado</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
