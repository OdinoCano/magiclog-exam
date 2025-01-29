# magiclog-exam
## Documentación
http://139.177.100.32:3000/docs/ o DOCUMENTATION.md
## Producción
http://139.177.100.32/
## Configuración
### Laravel Carro
La configuración se encuentra en /laravel-carro/README.md
### Marketplace
Ingresa a backend e instala las dependencias
```bash
cd backend
# npm
npm install
# yarn
yarn install
```
.env es para ejecutar el entorno de desarrollo. Para cambiar de entorno, modifica "NODE_ENV" por [dev, test, staging, prod].
También se puede modificar las URI que tienen acceso y el puerto en "src/main.ts":
```bash
# CORS
origin: 'http://localhost:3000',
# Puerto
await app.listen(3001);
```
##### Consejos
Antes de ejecutar el proyecto verifica las reglas de tu firewall y mantener actualizado el Sistema Operativo.
## Ejecutar Proyecto
Para ejecutarlo en segundo plano y tener un control más eficiente te recomiendo instalar "pm2", toma en cuenta que es necesario agregar la ruta del programa al PATH.
```bash
# npm
npm install -g pm2
# yarn
yarn global add pm2
```
Para ejecutar en segundo plano usa uno de estos comandos:
```bash
# pm2
pm2 start yarn --name "mi-app" -- start
# Si marca error usa
pm2 start yarn --name "mi-app" --interpreter bash -- start
# Creando un job con yarn
yarn start &
# Creando un job con npm
npm start &
# En Windows se usan los mismos comandos
```
