import { Model } from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface IUser {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: UserRole;
  isActive: boolean;
}

export interface UserModel extends Model<IUser> {
  isUserExists(email: string, phoneNumber: string): Promise<IUser>;
  isUserExistsById(id: string): Promise<IUser>;
  isUserExistsByCredentials(credentials: string): Promise<IUser>;
}
