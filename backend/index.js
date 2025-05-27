const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Product = require('./Product');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB Atlas (contraseña actualizada)
mongoose.connect('mongodb+srv://giomont:19712025@cluster0.p6sdz0h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Ruta para guardar producto
app.post('/api/products', async (req, res) => {
  const { name, price } = req.body;
  try {
    const product = new Product({ name, price });
    await product.save();
    res.status(201).json({ message: 'Producto guardado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el producto' });
  }
});

// Ruta para obtener todos los productos
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Ruta para eliminar un producto por ID
app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

// Ruta para editar un producto por ID
app.put('/api/products/:id', async (req, res) => {
  const { name, price } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
