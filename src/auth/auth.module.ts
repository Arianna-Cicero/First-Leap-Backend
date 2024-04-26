import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UtilizadorService } from 'src/resources/utilizador/utilizador.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilizador } from 'src/resources/utilizador/entities/utilizador.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/LocalStrategy';

@Module({
  imports:[TypeOrmModule.forFeature([Utilizador]), PassportModule],
  controllers: [AuthController],
  providers: [
    {
    provide: 'AUTH_SERVICE',
    useClass: AuthService,
  },
  {
    provide: 'UTILIZADOR_SERVICE',
    useClass: UtilizadorService,
  },
  LocalStrategy,
]
})
export class AuthModule {}
