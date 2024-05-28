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

  async validateUser(username: string, password: string, verificado: boolean): Promise<any> {
    const user = await this.utilizadorService.findUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await comparePasswords(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!verificado) {
      throw new UnauthorizedException('User not verified');
    }

    return user;
  }

  async login(username: string, password: string) {
    // Fetch user and check verification status inside validateUser method
    const user = await this.utilizadorService.findUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const verificado = await this.utilizadorService.findIfVerified(user.User_id); // Assuming you get the verified status using user.id
    
    const validatedUser = await this.validateUser(username, password, verificado);
    const payload = { username: validatedUser.username, sub: validatedUser.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      token: accessToken,
      user: validatedUser,
    };
  }
}
