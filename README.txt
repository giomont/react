# MongoDB debe estar corriendo localmente en el puerto 27017
# Puedes iniciar MongoDB con el comando:
# sudo systemctl start mongod

# Para iniciar el backend:
cd backend && node index.js

# Para iniciar el frontend:
cd ../frontend && npm start

# El frontend estará en http://localhost:3000 y el backend en http://localhost:5000
