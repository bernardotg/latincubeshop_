import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const { user, isAdmin, signOut, signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage('');
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signInWithEmail(email, password);
        if (error) throw error;
        onClose();
      } else {
        const { error } = await signUpWithEmail(email, password);
        if (error) throw error;
        setMessage('Revisa tu correo para confirmar tu cuenta.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signInWithGoogle();
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-overlay animate-fade-in" onClick={onClose}>
      <div className="login-modal animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="login-header">
          <h2>{user ? 'Mi Perfil' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}</h2>
          <button className="close-btn" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="login-body">
          {error && <div className="error-msg">{error}</div>}
          {message && <div className="success-msg">{message}</div>}

          {user ? (
            <div className="user-profile">
              <p style={{marginBottom: '20px', color: 'var(--text-secondary)'}}>Conectado como: <strong>{user.email}</strong></p>
              
              <button 
                className="btn btn-primary" 
                style={{width: '100%', marginBottom: '10px'}}
                onClick={() => {
                  window.location.href = '/mis-pedidos';
                }}
              >
                Mis Pedidos
              </button>

              {isAdmin && (
                <button 
                  className="btn btn-secondary" 
                  style={{width: '100%', marginBottom: '10px'}}
                  onClick={() => {
                    window.location.href = '/admin';
                  }}
                >
                  Panel de Administración
                </button>
              )}

              <button 
                className="btn btn-secondary" 
                style={{width: '100%', borderColor: 'var(--accent-red)', color: 'var(--accent-red)'}}
                onClick={async () => {
                  await signOut();
                  onClose();
                  if (window.location.pathname === '/admin' || window.location.pathname === '/mis-pedidos') {
                    window.location.href = '/';
                  }
                }}
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <button type="submit" className="btn btn-primary login-submit" disabled={loading}>
                  {loading ? 'Cargando...' : (isLogin ? 'Entrar' : 'Registrarse')}
                </button>
              </form>

              <div className="divider">o</div>

              <button className="btn btn-secondary google-btn" onClick={handleGoogleSignIn}>
                <svg width="18" height="18" viewBox="0 0 48 48" style={{ marginRight: '8px', flexShrink: 0 }}>
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                Continuar con Google
              </button>

              <p className="toggle-auth">
                {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
                <button type="button" onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
                  {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
