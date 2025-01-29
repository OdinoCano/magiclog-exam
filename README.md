# magiclog-exam

## Documentación
Puedes encontrar la documentación del proyecto en el siguiente enlace:
- [Documentación Web](http://139.177.100.32:3000/docs/)
- [DOCUMENTATION.md](DOCUMENTATION.md)

## Producción
Para acceder al entorno de producción, visita:
- [Producción](http://139.177.100.32/)

## Configuración
### Laravel Carro
Consulta la configuración en:
- `/laravel-carro/README.md`

### Marketplace
Para configurar el backend, sigue estos pasos:
1. Accede a la carpeta del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias utilizando `npm` o `yarn`:
   ```bash
   # Usando npm
   npm install
   
   # Usando yarn
   yarn install
   ```

3. Configura el entorno en el archivo `.env`. Para cambiar el entorno de ejecución, edita la variable `NODE_ENV` con uno de los siguientes valores:
   - `dev` (Desarrollo)
   - `test` (Pruebas)
   - `staging` (Pre-producción)
   - `prod` (Producción)

4. Puedes modificar las URI permitidas y el puerto en `src/main.ts`:
   ```typescript
   // Configurar CORS
   origin: 'http://localhost:3000',
   
   // Configurar puerto de escucha
   await app.listen(3001);
   ```

#### Consejos
- Asegúrate de revisar las reglas de tu firewall antes de ejecutar el proyecto.
- Mantén actualizado tu Sistema Operativo para evitar problemas de compatibilidad.

## Ejecutar Proyecto
Para ejecutar la aplicación en segundo plano y tener un mejor control, se recomienda instalar `pm2`. Es importante agregar la ruta del programa al `PATH`.

### Instalación de pm2
```bash
# Con npm
npm install -g pm2

# Con yarn
yarn global add pm2
```

### Ejecución en segundo plano
Ejecuta el backend con alguno de los siguientes comandos:
```bash
# Usando pm2
pm2 start yarn --name "mi-app" -- start

# Si hay errores, intenta con:
pm2 start yarn --name "mi-app" --interpreter bash -- start

# Usando un job con yarn
yarn start &

# Usando un job con npm
npm start &
```

### Consideraciones por sistema operativo
#### Linux y macOS
- Para evitar problemas de permisos, es recomendable ejecutar `npm install -g pm2` con `sudo` o configurar correctamente los permisos de usuario.
- Usa `nohup` si necesitas persistencia tras cerrar la terminal:
  ```bash
  nohup yarn start &
  ```

#### Windows
- Usa los mismos comandos indicados anteriormente.
- Para ejecutar `pm2` en Windows, asegúrate de tener configurado el `PATH` correctamente.
- Si necesitas ejecutar en segundo plano, usa `Start-Process` en PowerShell:
  ```powershell
  Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "start"
  ```

