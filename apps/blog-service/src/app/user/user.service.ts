import { Injectable } from '@nestjs/common';
import { User, UserCredentials } from './user.model';

@Injectable()
export class UserService {
  private readonly users: User[] = [
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

  private readonly userCredentials: UserCredentials[] = [
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

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async validatePassword(email: string, password: string): Promise<boolean> {
    const user = await this.findOneByEmail(email);

    if (!user) {
      return false;
    }

    return !!this.userCredentials.find((c) =>
      c.userId === user.id ? c.password === password : false
    );
  }
}
