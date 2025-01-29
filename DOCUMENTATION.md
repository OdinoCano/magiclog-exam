# Marketplace API - Documentación Técnica

## Información General
**Título:** Marketplace API  
**Descripción:** API para el Marketplace  
**Versión:** 1.0  

## Seguridad
La API utiliza autenticación JWT:
```http
Authorization: Bearer <token>
```

## Endpoints

### **App**
#### Obtener mensaje de bienvenida
```http
GET /
```
**Respuestas:**
- `200 OK`

### **Autenticación**
#### Validar usuario
```http
POST /auth/validate
```
**Respuestas:**
- `200 OK` - Usuario validado exitosamente
- `401 Unauthorized` - Token inválido

#### Registrar un nuevo usuario
```http
POST /auth/register
```
**Cuerpo de la petición:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Respuestas:**
- `201 Created` - Usuario registrado exitosamente
- `400 Bad Request` - Datos inválidos

#### Iniciar sesión
```http
POST /auth/login
```
**Cuerpo de la petición:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Respuestas:**
- `200 OK` - Inicio de sesión exitoso
- `401 Unauthorized` - Credenciales inválidas

#### Refrescar token
```http
POST /auth/refresh
```
**Respuestas:**
- `201 Created`

### **Usuarios**
#### Obtener perfil del usuario autenticado
```http
GET /users/profile
```
**Respuestas:**
- `200 OK` - Perfil del usuario
- `401 Unauthorized` - No autorizado

#### Obtener todos los usuarios (solo para administradores)
```http
GET /users
```
**Respuestas:**
- `200 OK` - Lista de usuarios
- `401 Unauthorized` - No autorizado
- `403 Forbidden` - Prohibido (requiere rol de administrador)

#### Obtener un usuario por ID (solo para administradores)
```http
GET /users/{id}
```
**Parámetros:**
- `id` (number) - ID del usuario

**Respuestas:**
- `200 OK` - Usuario encontrado
- `401 Unauthorized` - No autorizado
- `403 Forbidden` - Prohibido (requiere rol de administrador)
- `404 Not Found` - Usuario no encontrado

### **Carrito de Compras**
#### Agregar un producto al carrito
```http
POST /cart
```
**Cuerpo de la petición:**
```json
{
  "productId": 1,
  "quantity": 2
}
```
**Respuestas:**
- `201 Created` - Producto agregado al carrito
- `401 Unauthorized` - No autorizado
- `404 Not Found` - Producto no encontrado

### **Productos**
#### Crear un nuevo producto
```http
POST /products
```
**Cuerpo de la petición:**
```json
{
  "name": "Laptop",
  "sku": "ABC-123",
  "quantity": 10,
  "price": 1500
}
```
**Respuestas:**
- `201 Created` - Producto creado exitosamente
- `400 Bad Request` - Datos inválidos

#### Obtener todos los productos con filtros
```http
GET /products
```
**Parámetros opcionales:**
- `name` (string)
- `sku` (string)
- `minPrice` (number)
- `maxPrice` (number)
- `seller` (string) - ID o email del vendedor

**Respuestas:**
- `200 OK`

#### Obtener un producto por ID
```http
GET /products/{id}
```
**Parámetros:**
- `id` (number) - ID del producto

**Respuestas:**
- `200 OK` - Producto encontrado
- `404 Not Found` - Producto no encontrado

#### Actualizar un producto por ID
```http
PUT /products/{id}
```
**Parámetros:**
- `id` (number) - ID del producto

**Cuerpo de la petición:**
```json
{
  "name": "Laptop",
  "sku": "ABC-123",
  "quantity": 10,
  "price": 1500
}
```
**Respuestas:**
- `200 OK`

#### Eliminar un producto por ID
```http
DELETE /products/{id}
```
**Parámetros:**
- `id` (number) - ID del producto

**Respuestas:**
- `200 OK`

---
## **Autenticación**
La API requiere autenticación JWT para ciertos endpoints. Se debe incluir el token en el header `Authorization`.
```http
Authorization: Bearer <token>
```

## **Esquemas de Datos**
### **Registro de usuario (`RegisterDto`):**
```json
{
  "email": "string",
  "password": "string"
}
```

### **Inicio de sesión (`LoginDto`):**
```json
{
  "email": "string",
  "password": "string"
}
```

### **Creación y actualización de productos (`CreateProductDto` / `UpdateProductDto`):**
```json
{
  "name": "Laptop",
  "sku": "ABC-123",
  "quantity": 10,
  "price": 1500
}
```

---

## **Contacto**
Para más información, contactar por https://www.linkedin.com/in/edgar-misa%C3%A9l-cano-dom%C3%ADnguez-234333228/ 🚀
