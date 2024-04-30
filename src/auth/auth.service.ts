// import { Inject, Injectable } from '@nestjs/common';
// // import { comparePasswords } from 'src/auth/bcrypt';
// import { UtilizadorService } from 'src/resources/utilizador/utilizador.service';

// @Injectable()
// export class AuthService {
//   constructor(
//     @Inject('UTILIZADOR_SERVICE')
//     private readonly utilizadorService: UtilizadorService,
//   ) {}
//   async validateUser(username: string, password: string) {
//     const userDB = await this.utilizadorService.findUserByUsername(username);
//     if (userDB) {
//       // const matched = comparePasswords(password, userDB.password);
//       if (password === userDB.password) {
//         const matched = true;
//         if (matched) {
//           console.log('User validation sucess!');
//           return userDB;
//         } else {
//           console.log('Passwords do not match');
//           return null;
//         }
//       }
//     }
//     console.log('User validation failed!');
//     return null;
//   }
// }
// }

import { Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UtilizadorService } from 'src/resources/utilizador/utilizador.service';
// import { comparePasswords } from './bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UtilizadorService,
    private readonly jwtService: JwtService,
  ) {}

  async generateToken(payload: any) {
    return this.jwtService.sign(payload);
  }
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);

    if (user && password == user.password) {
      return user;
    }

    return null;
  }
  @Post('login')
  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    const accessToken = await this.generateToken(payload);

    return {
      message: 'Login successful',
      token: accessToken,
      user: user,
    };
  }
}
