import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UtilizadorService } from 'src/resources/utilizador/utilizador.service';
import { UnauthorizedException } from '@nestjs/common';
import { comparePasswords } from 'src/auth/bcrypt';

jest.mock('src/auth/bcrypt');

describe('AuthService', () => {
  let authService: AuthService;
  let utilizadorService: UtilizadorService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UtilizadorService,
          useValue: {
            findUserByUsername: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    utilizadorService = module.get<UtilizadorService>(UtilizadorService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    it('should return a valid token and user when credentials are valid and user is verified', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      const user = { 
        username, 
        password: 'hashedpassword', 
        verificado: true, 
        User_id: 1 
      };
      const token = 'testtoken';

      utilizadorService.findUserByUsername = jest.fn().mockResolvedValue(user);
      (comparePasswords as jest.Mock).mockResolvedValue(true);
      jwtService.sign = jest.fn().mockReturnValue(token);

      const result = await authService.login(username, password);

      expect(result).toEqual({
        message: 'Login successful',
        token,
        user,
      });
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      const username = 'testuser';
      const password = 'testpassword';

      utilizadorService.findUserByUsername = jest.fn().mockResolvedValue(null);

      await expect(authService.login(username, password)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user is not verified', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      const user = { 
        username, 
        password: 'hashedpassword', 
        verificado: false 
      };

      utilizadorService.findUserByUsername = jest.fn().mockResolvedValue(user);

      await expect(authService.login(username, password)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password does not match', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      const user = { 
        username, 
        password: 'hashedpassword', 
        verificado: true 
      };

      utilizadorService.findUserByUsername = jest.fn().mockResolvedValue(user);
      (comparePasswords as jest.Mock).mockResolvedValue(false);

      await expect(authService.login(username, password)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user is found but not verified', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      const user = { 
        username, 
        password: 'hashedpassword', 
        verificado: false 
      };

      utilizadorService.findUserByUsername = jest.fn().mockResolvedValue(user);

      await expect(authService.login(username, password)).rejects.toThrow(UnauthorizedException);
    });
  });
});
