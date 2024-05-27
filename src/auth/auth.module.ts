import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './utils/LocalStrategy';
import { jwtConstants } from './utils/constants';
import { JwtStrategy } from './utils/jwt.strategy';
import { UtilizadorService } from 'src/resources/utilizador/utilizador.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilizador } from 'src/resources/utilizador/entities/utilizador.entity';
import { AuthController } from './auth.controller';
import { EmailService } from '@src/mailer/sendMail';

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
  providers: [AuthService, LocalStrategy, JwtStrategy, UtilizadorService, EmailService],
  exports: [EmailService],
})
export class AuthModule {}
