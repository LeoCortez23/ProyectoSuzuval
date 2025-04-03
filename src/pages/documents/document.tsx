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
    <div className="card-doc">
      <h2 className="card-title">Formulario de Certificado</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      <form onSubmit={handleSubmit} className="card-form">
        <label>Tipo de Certificado:</label>
        <input
          type="text"
          name="tipo_certificado"
          value={formData.tipo_certificado}
          onChange={handleChange}
          required
        />

        <label>Marca:</label>
        <input
          type="text"
          name="marca"
          value={formData.marca}
          onChange={handleChange}
          required
        />

        <label>Modelo:</label>
        <input
          type="text"
          name="modelo"
          value={formData.modelo}
          onChange={handleChange}
          required
        />

        <label>Chasis:</label>
        <input
          type="text"
          name="chasis"
          value={formData.chasis}
          onChange={handleChange}
          required
        />

        <label>Motor:</label>
        <input
          type="text"
          name="motor"
          value={formData.motor}
          onChange={handleChange}
          required
        />

        <label>Año:</label>
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
        />

        <label>Patente:</label>
        <input
          type="text"
          name="patente"
          value={formData.patente}
          onChange={handleChange}
          required
        />

        <label>Horas:</label>
        <input
          type="number"
          name="horas"
          value={formData.horas}
          onChange={handleChange}
          required
        />

        <label>Orden de Trabajo:</label>
        <input
          type="text"
          name="ordenTrabajo"
          value={formData.ordenTrabajo}
          onChange={handleChange}
          required
        />

        <label>Detalle:</label>
        <textarea
          name="detalle"
          value={formData.detalle}
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="btn">Enviar Documento</button>
      </form>
    </div>
  );
};

export default Document;
