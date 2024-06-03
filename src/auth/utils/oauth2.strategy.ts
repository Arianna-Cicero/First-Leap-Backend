// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-oauth2';
// import { AuthService } from '../auth.service';

// @Injectable()
// export class OAuth2Strategy extends PassportStrategy(Strategy, 'oauth2') {
//   constructor(private readonly authService: AuthService) {
//     super({
//       authorizationURL: 'https://provider.com/oauth2/authorize',
//       tokenURL: 'https://provider.com/oauth2/token',
//       clientID: 'your-client-id',
//       clientSecret: 'your-client-secret',
//       callbackURL: 'http://localhost:3000/auth/callback',
//     });
//   }

//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: any,
//     done: Function,
//   ) {
//     try {
//       const user = await this.authService.validateUser(profile);
//       done(null, user);
//     } catch (err) {
//       done(err, false);
//     }
//   }
// }
