import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity'; // Importa la entidad User
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) // Inyecta UserRepository
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService, // Inyecta JwtService
  ) {}

  async validateUser(token: string): Promise<any> {
    try {
      // Verifica el token JWT
      const payload = this.jwtService.verify(token);

      const email = payload.email;

      const user = await this.usersRepository.findOne({ where: { email } });
      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      // Retornar los datos del usuario como respuesta
      const { password, ...result } = user;
      return result;
    } catch (error) {
      console.error('Error validando token:', error.message);
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    // Verificar si el usuario ya existe
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    const salt = bcrypt.genSaltSync(10);

    // Hash de la contraseña
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Crear y guardar el nuevo usuario
    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      role: 'seller', // Rol por defecto
    });

    this.usersRepository.save(user);
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Buscar el usuario por email
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar token JWT
    const payload = { sub:user.id, email: user.email, role: user.role };
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1d' });
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
    };
  }

  async refreshToken(user: User) {
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const payload = {id: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}