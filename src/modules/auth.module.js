// import { Controller, Post } from '@nestjs/common';

// @Controller('auth')
// class AuthController {
//   constructor(verificationService) {
//     this.verificationService = verificationService;
//   }

//   @Post('register')
//   async register(req, res) {
//     const { email } = req.body;

//     const verificationCode =
//       this.verificationService.generateVerificationCode();

//     try {
//       await this.verificationService.sendVerificationEmail(
//         email,
//         verificationCode,
//       );

//       return res.status(201).json({
//         message: 'User registered successfully. Verification email sent.',
//       });
//     } catch (error) {
//       console.error('Error registering user:', error);
//       return res
//         .status(500)
//         .json({ message: 'Failed to register user. Please try again later.' });
//     }
//   }
// }

// export default { AuthController };
