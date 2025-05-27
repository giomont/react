import { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({ name: '', price: '', imageUrl: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          price: parseFloat(form.price),
          imageUrl: form.imageUrl
        })
      });
      if (res.ok) {
        setMessage('Producto guardado correctamente');
        setForm({ name: '', price: '', imageUrl: '' });
      } else {
        setMessage('Error al guardar el producto');
      }
    } catch (err) {
      setMessage('Error de conexión con el backend');
    }
  };

  return (
    <div className="App">
      <h2>Formulario de Producto</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: 'auto' }}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Precio" value={form.price} onChange={handleChange} required />
        <input name="imageUrl" placeholder="URL de imagen" value={form.imageUrl} onChange={handleChange} required />
        <button type="submit">Guardar</button>
      </form>
      {message && <p>{message}</p>}
      {form.imageUrl && <img src={form.imageUrl} alt="Vista previa" style={{ maxWidth: '200px', marginTop: '10px' }} />}
    </div>
  );
}

export default App;
