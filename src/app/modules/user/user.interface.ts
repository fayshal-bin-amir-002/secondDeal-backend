import { Document, Model, Types } from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export enum Locations {
  DHAKA = "Dhaka",
  CHITTAGONG = "Chittagong",
  RAJSHAHI = "Rajshahi",
  KHULNA = "Khulna",
  BARISAL = "Barisal",
  SYLHET = "Sylhet",
  RANGPUR = "Rangpur",
  MYMENSINGH = "Mymensingh",
}

export interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  location: Locations;
  role: UserRole;
  isActive: boolean;
}

export interface UserModel extends Model<IUser> {
  isUserExists(email: string, phoneNumber: string): Promise<IUser>;
  isUserExistsById(id: string | Types.ObjectId): Promise<IUser>;
  isUserExistsByCredentials(credentials: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
