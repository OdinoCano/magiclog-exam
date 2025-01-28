import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../users/dto/register.dto';
import { LoginDto } from '../users/dto/login.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-jwt-auth.guard';
import { User } from 'src/users/users.entity';
import { Public } from './decorators/public.decorator';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: User; // Define el tipo del usuario
}

@Public()
@ApiTags('Auth') // Agrupa los endpoints bajo la etiqueta "auth"
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // Validación de usuario usando jwt
  @Post('validate')
  @ApiOperation({ summary: 'Validar usuario' }) // Descripción del endpoint
  @ApiResponse({ status: 200, description: 'Usuario validado exitosamente' }) // Respuesta exitosa
  @ApiResponse({ status: 401, description: 'Token inválido' }) // Respuesta de error
  async validateUser(@Req() request: Request) {
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const [type, token] = authorizationHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Token inválido o mal formado');
    }

    const user = await this.authService.validateUser(token);
    return user;
  }

  // Registro de un nuevo usuario
  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' }) // Descripción del endpoint
  @ApiBody({ type: RegisterDto }) // Especifica el tipo de cuerpo esperado
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' }) // Respuesta exitosa
  @ApiResponse({ status: 400, description: 'Datos inválidos' }) // Respuesta de error
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // Inicio de sesión de un usuario
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' }) // Descripción del endpoint
  @ApiBody({ type: LoginDto }) // Especifica el tipo de cuerpo esperado
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' }) // Respuesta exitosa
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' }) // Respuesta de error
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  @ApiOperation({ summary: 'Refrescar token' }) // Descripción del endpoint
  refresh(@Req() request: AuthenticatedRequest) {
    const user = request.user as User;
    return this.authService.refreshToken(user);
  }
}