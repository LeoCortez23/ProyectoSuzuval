import { useState } from 'react';
import './document.css'; 

const Document = () => {
  const [formData, setFormData] = useState({
    tipo_certificado: '',
    marca: '',
    modelo: '',
    chasis: '',
    motor: '',
    year: '',
    patente: '',
    horas: '',
    ordenTrabajo: '',
    detalle: '',
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const API_URL = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken'); // Obtener el token
    if (!token) {
      setError('No tienes una sesión activa. Inicia sesión nuevamente.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}document/generateDocument`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Enviar token en el encabezado
        },
        body: JSON.stringify({ data: formData }), // Enviar los datos ingresados por el usuario
      });

      if (response.ok) {
        setMessage('Documento enviado con éxito.');
        setError('');
      } else {
        const errorText = await response.text();
        setError(errorText || 'Error al enviar el documento.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setError('Error de conexión.');
    }
  };

  return (
    <div className="card-doc">
      <h2 className="card-title">Formulario de Certificado</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      
      <form onSubmit={handleSubmit} className="card-form">
        <label>Tipo de Certificado:</label>
        <input type="text" name="tipo_certificado" value={formData.tipo_certificado} onChange={handleChange} required />

        <label>Marca:</label>
        <input type="text" name="marca" value={formData.marca} onChange={handleChange} required />

        <label>Modelo:</label>
        <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} required />

        <label>Chasis:</label>
        <input type="text" name="chasis" value={formData.chasis} onChange={handleChange} required />

        <label>Motor:</label>
        <input type="text" name="motor" value={formData.motor} onChange={handleChange} required />

        <label>Año:</label>
        <input type="number" name="year" value={formData.year} onChange={handleChange} required />

        <label>Patente:</label>
        <input type="text" name="patente" value={formData.patente} onChange={handleChange} required />

        <label>Horas:</label>
        <input type="number" name="horas" value={formData.horas} onChange={handleChange} required />

        <label>Orden de Trabajo:</label>
        <input type="text" name="ordenTrabajo" value={formData.ordenTrabajo} onChange={handleChange} required />

        <label>Detalle:</label>
        <textarea name="detalle" value={formData.detalle} onChange={handleChange}></textarea>

        <button type="submit" className="btn">Enviar Documento</button>
      </form>
    </div>
  );
};

export default Document;
