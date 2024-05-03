import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './utils/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilizador } from 'src/resources/utilizador/entities/utilizador.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UtilizadorService } from 'src/resources/utilizador/utilizador.service';
import { LocalStrategy } from './utils/LocalStrategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Utilizador]),
    JwtModule.register(jwtConfig),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, UtilizadorService],
})
export class AuthModule {}
