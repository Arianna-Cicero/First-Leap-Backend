import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
// import { LocalStrategy } from './utils/LocalStrategy';
import { jwtConstants } from './utils/constants';
// import { JwtStrategy } from './utils/jwt.strategy';
import { UtilizadorService } from 'src/resources/utilizador/utilizador.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilizador } from 'src/resources/utilizador/entities/utilizador.entity';
import { AuthController } from './auth.controller';
import { EmailverificationModule } from '@src/resources/emailverification/emailverification.module';
import { EmailModule } from '@src/modules/email.module';
import { UtilizadorModule } from '@src/resources/utilizador/utilizador.module';
import { LocalStrategy } from './LocalStrategy';

@Module({
  imports: [
    forwardRef(() => PassportModule), 
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([Utilizador]),
    forwardRef(() => EmailverificationModule), 
    forwardRef(() => EmailModule), 
    forwardRef(() => UtilizadorModule), 
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, /*JwtStrategy,*/ UtilizadorService],
})
export class AuthModule {}
