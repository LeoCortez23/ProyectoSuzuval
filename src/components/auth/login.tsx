import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/auth/signIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token); // Guardar el token
        alert('Login exitoso');

        navigate('/document', { state: { token: data.token } });
      } else {
        const errorText = await response.text();
        setError(errorText || '¡Error al iniciar sesión!');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setError('¡Error de conexión!');
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Ingrese su correo</label>
          <input
            type="text"
            id="username"
            placeholder="@"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Ingrese su contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
