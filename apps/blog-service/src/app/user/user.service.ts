import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { USERS, USER_CREDENTIALS } from './user.mock';

@Injectable()
export class UserService {
  private readonly users = USERS;

  private readonly userCredentials = USER_CREDENTIALS;

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
