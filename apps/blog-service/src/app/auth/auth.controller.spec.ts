import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthModule } from './auth.module';
import { JWTUser } from './auth.model';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should return an access token when provided with valid credentials', async () => {
      const credentials = {
        email: 'adam.angularadvocate@gmail.com',
        password: 'angular',
      };
      const result = await controller.login(credentials);
      expect(typeof result.access_token).toBe('string');
    });

    it('should throw an error when provided with invalid credentials', async () => {
      const credentials = {
        email: 'testuser',
        password: 'wrongpassword',
      };
      await expect(controller.login(credentials)).rejects.toThrowError(
        'Unauthorized'
      );
    });
  });

  describe('profile', () => {
    it('should return the user profile when a valid JWT token is present in the headers', async () => {
      const jwtUser: JWTUser = {
        sub: 2,
        email: 'adam.angularadvocate@gmail.com',
        iat: 1686855209,
        exp: 1686858809,
      };
      const profile = await controller.getProfile({ user: jwtUser });
      expect(profile).toEqual({
        id: 2,
        email: 'adam.angularadvocate@gmail.com',
        firstName: 'Adam',
        lastName: 'Angularadvocate',
      });
    });

    it('should return undefined when a user is not present', async () => {
      expect(await controller.getProfile({})).toEqual(undefined);
    });

    it('should return undefined when an invalid user is present', async () => {
      const jwtUser: JWTUser = {
        sub: 1000,
        email: 'doesnotexist@gamil.com',
        iat: 1686855209,
        exp: 1686858809,
      };
      const profile = await controller.getProfile({ user: jwtUser });
      expect(profile).toEqual(undefined);
    });
  });
});
