import {
  Controller,
  Get,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Request } from 'express';
import { User } from './users.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: User; // Define el tipo del usuario
}

@UseGuards(JwtAuthGuard)// Protege las rutas con el guard de autenticación
@ApiTags('Users') // Agrupa los endpoints bajo la etiqueta "users"
@ApiBearerAuth('JWT-auth') // Habilita la autenticación JWT en Swagger
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Obtener el perfil del usuario autenticado
  @Get('profile')
  @ApiOperation({ summary: 'Obtener el perfil del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil del usuario' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getProfile(@Req() request: AuthenticatedRequest) {
    const user = request.user as User; // El usuario viene del AuthGuard
    return this.usersService.getProfile(user.id);
  }

  // Obtener todos los usuarios (solo para administradores)
  @Get()
  @UseGuards(RolesGuard) // Protege la ruta con ambos guards
  @Roles(Role.Admin) // Solo los administradores pueden acceder
  @ApiOperation({ summary: 'Obtener todos los usuarios (solo para administradores)' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido (requiere rol de administrador)' })
  async findAll() {
    return this.usersService.findAll();
  }

  // Obtener un usuario por ID (solo para administradores)
  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Obtener un usuario por ID (solo para administradores)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido (requiere rol de administrador)' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }
}