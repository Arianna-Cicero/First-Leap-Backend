import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { jwtConstants } from './utils/constants';
import { UtilizadorService } from 'src/resources/utilizador/utilizador.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilizador } from 'src/resources/utilizador/entities/utilizador.entity';
import { LocalStrategy } from './utils/LocalStrategy';
import { JwtStrategy } from './utils/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([Utilizador]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UtilizadorService],
})
export class AuthModule {}
