import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UtilizadorService } from 'src/resources/utilizador/utilizador.service';
import { comparePasswords } from 'src/auth/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private utilizadorService: UtilizadorService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.utilizadorService.findUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await comparePasswords(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  generateJwtToken(payload: any) {
    return this.jwtService.sign(payload); // Use JwtService to sign and generate the token
  }

  async login(username: string, password: string) {
    const user = await this.utilizadorService.findUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.verificado) {
      throw new UnauthorizedException('User not verified');
    }

    const validatedUser = await this.validateUser(username, password);

    const payload = {
      username: validatedUser.username,
      sub: validatedUser.User_id,
    };

    const accessToken = this.generateJwtToken(payload);

    return {
      message: 'Login successful',
      token: accessToken,
      user: validatedUser,
    };
  }
}
