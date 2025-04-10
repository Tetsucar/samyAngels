# 🛍️ SamyAngels - Backend

Este proyecto representa el backend de la plataforma **SamyAngels**, una tienda online que permite a los usuarios registrarse, iniciar sesión, seleccionar productos, elegir métodos de pago y registrar pedidos.

---

## 🚀 Tecnologías usadas

- Node.js
- Express.js
- Sequelize ORM
- MySQL / MariaDB
- Jest + Supertest (para pruebas)

---

## ⚙️ Requisitos previos

- Node.js (v16+ recomendado)
- MySQL o MariaDB corriendo localmente

---

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Tetsucar/samyAngels.git
cd samyAngels
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Crear y configurar la base de datos**

- Accede a tu MySQL/MariaDB y crea una base de datos:
```sql
CREATE DATABASE samyangels;
```

- Configura la conexión en `config/database.js`:
```js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('samyangels', 'TU_USUARIO', 'TU_CONTRASEÑA', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
```

4. **Sincronizar la base de datos**

Cuando ejecutas la app, Sequelize creará las tablas automáticamente según los modelos.

---

## ▶️ Ejecutar el backend

```bash
npm start
```
La app correrá en [http://localhost:3000](http://localhost:3000)

---

## 🧪 Ejecutar los tests

1. **Estructura recomendada de tests**

```
__tests__/
├── login/
├── pago/
├── pedido/
├── productos/
├── registro_usuario/
└── validacion_registro/
```

2. **Correr todos los tests**
```bash
npm test
```

3. **Correr un test individual**
```bash
npx jest __tests/pedido/pedido_exitoso.js
```

4. **Correr todos los tests de una carpeta específica**
```bash
npx jest __tests/login
npx jest __tests/pago
npx jest __tests/pedido
npx jest __tests/productos
npx jest __tests/registro_usuario
npx jest __tests/validacion_registro
```

---

## ✅ Funcionalidades cubiertas en pruebas

- Registro de usuario
- Validación de datos del usuario
- Inicio de sesión
- Listado y modificación de productos
- Cálculo del total según productos seleccionados
- Elección de método de pago
- Confirmación del pedido
- Manejo de errores comunes (campos vacíos, método de pago inválido, etc)

---

## 📂 Estructura del proyecto

```
samyAngels/
├── app.js
├── bin/
│   └── www
├── config/
│   └── database.js
├── controllers/
├── models/
├── public/
├── routes/
├── views/
├── __tests__/
│   ├── login/
│   ├── pago/
│   ├── pedido/
│   ├── productos/
│   ├── registro_usuario/
│   └── validacion_registro/
├── .gitignore
├── jest.config.js
├── package-lock.json
└── package.json
```

---

## 🧑‍💻 Colaboradores
**@Tetsucar** - Proyecto para fines académicos y práctica de desarrollo backend con Node.js  
**@JESSIKA-03-sys** - Proyecto para fines académicos y práctica de desarrollo backend con Node.js  
**@sebas2314** - Proyecto para fines académicos y práctica de desarrollo backend con Node.js
