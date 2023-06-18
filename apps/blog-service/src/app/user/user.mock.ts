import type { User } from '@tbcc/models';
import { UserCredentials } from './user.model';

export const USERS: User[] = [
  {
    id: 1,
    email: 'robert.reactfan@gmail.com',
    firstName: 'Robert',
    lastName: 'Reactfan',
  },
  {
    id: 2,
    email: 'adam.angularadvocate@gmail.com',
    firstName: 'Adam',
    lastName: 'Angularadvocate',
  },
  {
    id: 3,
    email: 'victoria.vuesupporter@gmail.com',
    firstName: 'Victoria',
    lastName: 'Vuesupporter',
  },
];

export const USER_CREDENTIALS: UserCredentials[] = [
  {
    userId: 1,
    // in a real application password would be encrypted and plain password would not be stored
    // in the database to avoid security problems in case database is stolen
    password: 'react',
  },
  {
    userId: 2,
    password: 'angular',
  },
  {
    userId: 3,
    password: 'vue',
  },
];
