// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UtilizadorService } from 'src/resources/utilizador/utilizador.service';
// import { comparePasswords } from './bcrypt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private utilizadorService: UtilizadorService,
//     private jwtService: JwtService,
//   ) {}

//   async validateUser(username: string, password: string): Promise<any> {
//     const user = await this.utilizadorService.findUserByUsername(username);
//     if (!user) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     const passwordMatch = await comparePasswords(password, user.password);
//     console.log('password:' + password);
//     console.log('password2:' + user.password);
//     if (!passwordMatch) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     return user;
//   }

//   async login(username: string, password: string) {
//     const user = await this.validateUser(username, password);
//     const payload = { username: user.username, sub: user.id };
//     const accessToken = this.jwtService.sign(payload);

//     return {
//       message: 'Login successful',
//       token: accessToken,
//       user,
//     };
//   }
// }
