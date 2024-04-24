// import { Injectable, Inject } from '@nestjs/common';
// import { Sequelize } from 'sequelize';

// @Injectable()
// export class UserService {
//   constructor(
//     @Inject('SEQUELIZE')
//     private sequelize: Sequelize,
//   ) {}

//   async findByEmail(email: string) {
//     try {
//       const user = await this.sequelize.models.User.findOne({
//         where: { email },
//       });
//       return user;
//     } catch (error) {
//       console.error('Error finding user by email:', error);
//       throw new Error('Failed to find user by email');
//     }
//   }

//   async findById(id: number) {
//     try {
//       const user = await this.sequelize.models.User.findByPk(id);
//       return user;
//     } catch (error) {
//       console.error('Error finding user by ID:', error);
//       throw new Error('Failed to find user by ID');
//     }
//   }

//   async findAllUsers() {
//     try {
//       const [results, metadata] = await this.sequelize.query(
//         'SELECT * FROM Utilizador',
//       );
//       return results;
//     } catch (error) {
//       console.error('Error finding all users:', error);
//       throw new Error('Failed to find all users');
//     }
//   }
// }
