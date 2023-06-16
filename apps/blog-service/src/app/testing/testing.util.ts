import { JWTUser } from '../auth/auth.model';

export const testingUtil = {
  createRequestWithUser: (
    sub = 2,
    email = 'adam.angularadvocate@gmail.com'
  ) => {
    const user: JWTUser = {
      sub,
      email,
      iat: 1686855209,
      exp: 1686858809,
    };
    return {
      user,
    };
  },
};
