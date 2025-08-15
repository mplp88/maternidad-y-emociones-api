# Maternidad y Emociones API

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

API RESTful desarrollada en Node.js para el sitio [Maternidad y Emociones](https://maternidadyemociones.com.ar). Provee endpoints para autenticación de usuarios, gestión de blogs y manejo de imágenes.

---

## 🚀 Tecnologías principales

- [Express](https://expressjs.com/) — Framework minimalista para construir APIs y aplicaciones web.
- [Axios](https://axios-http.com/) — Cliente HTTP para realizar solicitudes a otros servicios.
- [CORS](https://www.npmjs.com/package/cors) — Middleware para habilitar el intercambio de recursos entre dominios.
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) — Hash de contraseñas para almacenamiento seguro.
- [dotenv](https://www.npmjs.com/package/dotenv) — Carga variables de entorno desde un archivo `.env`.
- [jsonwebtoken (JWT)](https://jwt.io/) — Autenticación basada en JSON Web Tokens.
- [Mongoose](https://mongoosejs.com/) — ODM para modelar datos en MongoDB.
- [Multer](https://www.npmjs.com/package/multer) — Middleware para manejar la carga de archivos.

**Dependencias de desarrollo:**
- [nodemon](https://www.npmjs.com/package/nodemon) — Reinicia automáticamente el servidor al detectar cambios en el código.

---

## 📂 Estructura del proyecto

```
├── api
│   └── index.js
├── middleware
│   └── authMiddleware.js
├── models
│   ├── blog.js
│   └── user.js
├── routes
│   ├── auth.js
│   ├── blogs.js
│   └── image.js
├── package.json
└── vercel.json
```


---

## ⚙️ Instalación y ejecución

1. **Cloná el repositorio:**
```bash
git clone https://github.com/tu-usuario/maternidad-y-emociones-api.git
cd maternidad-y-emociones-api
```

2. **Instalá las dependencias:**
```bash
npm install
```

3. **Configurá las variables de entorno**  
Crear un archivo `.env` en la raíz del proyecto basándote en `.env.example`:
```env
JWT_SECRET=<UnSecretoMuyLargoYComplicado>
MONGO_URI=<UrlDeMongoAtlas>
CLOUDINARY_CLOUD_NAME=<CloudNameDeCloudinary>
CLOUDINARY_API_KEY=<TuApiKeyDeCloudinary>
CLOUDINARY_API_SECRET=<TuApiSecretDeCloudinary>
 ```

4. Ejecutá el servidor en modo desarrollo:
```bash
npm run dev
```

---

##  Scripts disponibles
| Comando           | Descripción                                        |
|-------------------|----------------------------------------------------|
| `npm run dev`     | Inicia el servidor de desarrollo con Vite          |
| `npm start`       | Inicia el servidor en modo producción.             |

---

## 🌐 Despliegue

Este proyecto está desplegado en **[Vercel](https://vercel.com/)** y utiliza **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** como base de datos. Las imágenes cargadas se hostean en [Cloudinary](https://cloudinary.com/)

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**.  
Puedes usarlo, modificarlo y distribuirlo libremente citando la fuente.
