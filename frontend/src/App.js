import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({ name: '', price: '' });
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  // Obtener productos al cargar
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:5000/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const url = editId ? `http://localhost:5000/api/products/${editId}` : 'http://localhost:5000/api/products';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          price: parseFloat(form.price)
        })
      });
      if (res.ok) {
        setMessage(editId ? 'Producto actualizado' : 'Producto guardado correctamente');
        setForm({ name: '', price: '' });
        setEditId(null);
        fetchProducts();
      } else {
        setMessage('Error al guardar el producto');
      }
    } catch (err) {
      setMessage('Error de conexión con el backend');
    }
  };

  const handleEdit = (product) => {
    setForm({ name: product.name, price: product.price });
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;
    await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  return (
    <div className="App">
      <h2>Formulario de Producto</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: 'auto' }}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Precio" value={form.price} onChange={handleChange} required />
        <button type="submit">{editId ? 'Actualizar' : 'Guardar'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ name: '', price: '' }); }}>Cancelar edición</button>}
      </form>
      {message && <p>{message}</p>}
      <h2>Productos guardados</h2>
      <div style={{ maxWidth: '600px', margin: 'auto' }}>
        {products.length === 0 && <p>No hay productos guardados.</p>}
        {products.map(product => (
          <div key={product._id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10, borderRadius: 8 }}>
            <strong>{product.name}</strong> - ${product.price}<br />
            <button onClick={() => handleEdit(product)}>Editar</button>
            <button onClick={() => handleDelete(product._id)} style={{ marginLeft: 10 }}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
