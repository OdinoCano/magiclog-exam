import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Marketplace API')
    .setDescription('API para el Marketplace')
    .setVersion('1.0')
    .addBearerAuth( // Habilita la autenticación JWT en Swagger
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Ingresa el token JWT',
        in: 'header',
      },
      'JWT-auth', // Nombre del esquema de autenticación
    )
    .build();
  
  if (process.env.NODE_ENV !== 'production') {
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document); // Ruta para acceder a Swagger: /api
  }

  // Habilita CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Permite solicitudes desde el frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permite enviar cookies y encabezados de autenticación
  });

  await app.listen(3001);
}
bootstrap();