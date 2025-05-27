const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Product = require('./Product');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/reactform', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado'))
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
