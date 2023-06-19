import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { AuthController } from './auth.controller';
import { testingUtil } from '../testing/testing.util';
import { AUTH_COOKIE_NAME } from './auth.constant';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';

const MOCK_ACCESS_TOKEN = 'access_token_value';

const createMockResponse = () => {
  const response = {} as unknown as Response;
  response.status = jest.fn(() => response);
  response.cookie = jest.fn(() => response);
  response.clearCookie = jest.fn(() => response);
  response.send = jest.fn();
  return response;
};

describe('AuthController', () => {
  let controller: AuthController;
  let mockJwtService;

  beforeEach(async () => {
    mockJwtService = {
      signAsync: jest.fn(() => Promise.resolve(MOCK_ACCESS_TOKEN)),
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should return an access token when provided with valid credentials', async () => {
      const credentials = {
        email: 'adam.angularadvocate@gmail.com',
        password: 'angular',
      };
      const mockResponse = createMockResponse();
      await controller.login(credentials, mockResponse);

      expect(mockResponse.cookie).toHaveBeenCalledWith(
        AUTH_COOKIE_NAME,
        MOCK_ACCESS_TOKEN,
        {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
        }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.send).toHaveBeenCalled();
      expect(mockJwtService.signAsync).toHaveBeenCalledWith({
        sub: 2,
        email: credentials.email,
      });
    });

    it('should throw an error when provided with invalid credentials', async () => {
      const credentials = {
        email: 'testuser',
        password: 'wrongpassword',
      };
      const mockResponse = createMockResponse();
      await expect(
        controller.login(credentials, mockResponse)
      ).rejects.toThrowError('Unauthorized');
    });
  });

  describe('logout', () => {
    it('should remove cookie', async () => {
      const mockResponse = createMockResponse();
      await controller.logout(mockResponse);

      expect(mockResponse.clearCookie).toHaveBeenCalledWith(AUTH_COOKIE_NAME);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });

  describe('profile', () => {
    it('should return the user profile when a valid JWT token is present in the headers', async () => {
      const request = testingUtil.createRequestWithUser();
      const profile = await controller.getProfile(request);
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
      const request = testingUtil.createRequestWithUser(
        1000,
        'doesnotexist@gamil.com'
      );
      const profile = await controller.getProfile(request);
      expect(profile).toEqual(undefined);
    });
  });
});
