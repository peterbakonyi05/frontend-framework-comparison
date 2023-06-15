export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserCredentials {
  userId: number;
  password: string;
}
