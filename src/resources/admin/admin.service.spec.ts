import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module'; // Adjust the path as per your project structure

describe('Admin (System Test)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /admin', () => {
    it('should create a new admin', async () => {
      const adminData = {
        position: 'Support',
        utilizador: {
          User_id: 1,
          name: 'Joao',
          username: 'joaotest',
          password: 'joaotest',
          number: 3192783,
          email: 'test@gmail.com',
          birth_date: undefined,
          emailverification: undefined,
        },
      };

      try {
        const response = await request(app.getHttpServer())
          .post('/admin')
          .send(adminData)
          .expect(201);

        expect(response.body).toMatchObject({
          position: 'Support',
          utilizador: {
            User_id: 1,
            name: 'Joao',
            username: 'joaotest',
            number: 3192783,
            email: 'test@gmail.com',
            birth_date: null, // undefined becomes null in JSON responses
            emailverification: null,
          },
        });
      } catch (error) {
        console.error('Error creating admin:', error);
        fail('Failed to create admin');
      }
    });
  });
});
