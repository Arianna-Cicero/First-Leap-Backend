import { Controller, Post } from '@nestjs/common';

@Controller('auth')
class AuthController {
  constructor(verificationService, userService) {
    this.verificationService = verificationService;
    this.userService = userService;
  }

  @Post('verify')
  async verify(req, res) {
    const { email, verificationCode } = req.body;

    try {
      // Find user by email
      const user = await this.userService.findByEmail(email);

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Verify the provided code against the stored code
      const isCodeValid = this.verificationService.verifyCode(
        email,
        verificationCode,
      );

      if (!isCodeValid) {
        return res.status(400).json({ message: 'Invalid verification code.' });
      }

      // Mark the user as verified
      user.verified = true;
      await user.save();

      return res.status(200).json({ message: 'User verified successfully.' });
    } catch (error) {
      console.error('Error verifying user:', error);
      return res.status(500).json({ message: 'Failed to verify user.' });
    }
  }
}

export default { AuthController };
