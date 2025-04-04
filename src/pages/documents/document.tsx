import { useState } from 'react';
import './document.css';

interface DocumentForm {
  tipo_certificado: string;
  marca: string;
  modelo: string;
  chasis: string;
  motor: string;
  year: number;
  patente: string;
  horas: number;
  ordenTrabajo: string;
  fecha: string;
  detalle: string;
}

const Document = () => {
  const [formData, setFormData] = useState<DocumentForm>({
    tipo_certificado: '',
    marca: '',
    modelo: '',
    chasis: '',
    motor: '',
    year: 2023, // Asumiendo que el año por defecto es 2023
    patente: '',
    horas: 0,
    ordenTrabajo: '',
    fecha: '',
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

  const formatFecha = (fecha: Date): string => {
    const day = fecha.getDate().toString().padStart(2, '0'); // Día con 2 dígitos
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Mes con 2 dígitos (recordar que los meses en JavaScript van de 0 a 11)
    const year = fecha.getFullYear(); // Año
  
    return `${day}/${month}/${year}`; 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fechaActual = formatFecha(new Date());
    const formDataConFecha = {
    ...formData,
    fecha: fechaActual, 
  };

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
        body: JSON.stringify(formDataConFecha), // Enviar los datos ingresados por el usuario
      });

   

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement('a'); // Crear un enlace para la descarga
        link.href = URL.createObjectURL(blob); // Crear una URL para el Blob
        link.download = 'Certificado.pdf'; // Nombre por defecto del archivo a descargar
        link.click(); // Simula un click en el enlace para descargar el archivo
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
    <div className='container'>
      <div className="card-doc">
        <h2 className="card-title">Formulario de Certificado</h2>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        <form onSubmit={handleSubmit} className="card-form">
          <div className="form-group">
            <label>Tipo de Certificado:</label>
            <input type="text" name="tipo_certificado" value={formData.tipo_certificado} className="input-doc" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Marca:</label>
            <input type="text" name="marca" value={formData.marca} className="input-doc" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Modelo:</label>
            <input type="text" name="modelo" value={formData.modelo} className="input-doc" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Chasis:</label>
            <input type="text" name="chasis" value={formData.chasis} className="input-doc" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Motor:</label>
            <input type="text" name="motor" value={formData.motor} className="input-doc" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Año:</label>
            <input type="number" name="year" value={formData.year} className="input-doc" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Patente:</label>
            <input type="text" name="patente" value={formData.patente} className="input-doc" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Horas:</label>
            <input type="number" name="horas" value={formData.horas} className="input-doc" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Orden de Trabajo:</label>
            <input type="text" name="ordenTrabajo" value={formData.ordenTrabajo} className="input-doc" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Detalle:</label>
            <textarea name="detalle" value={formData.detalle} className="input-doc" onChange={handleChange}></textarea>
          </div>

          <div className="btn-group">
            <button type="submit" className="btn">Generar Certificado</button>
          </div>

        </form>

      </div>
      
    </div>
    
    
  );
};

export default Document;
