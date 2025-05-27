const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Product = require('./Product');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB Atlas (contraseña codificada)
mongoose.connect('mongodb+srv://giomont:4%25nwC.3z.bEQ8%40P@cluster0.p6sdz0h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Ruta para guardar producto
app.post('/api/products', async (req, res) => {
  const { name, price, imageUrl } = req.body;
  try {
    const product = new Product({ name, price, imageUrl });
    await product.save();
    res.status(201).json({ message: 'Producto guardado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el producto' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
