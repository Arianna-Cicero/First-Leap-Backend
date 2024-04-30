import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const result = await this.authService.validateUser(username, password);
    return result;
  }
}
