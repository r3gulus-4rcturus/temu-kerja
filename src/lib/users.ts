import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

type RegisterPayload = {
  username: string;
  password: string;
  confirmPassword: string;
  role: 'jobseeker' | 'jobprovider'; // match your `UserRole` enum
  personalInfo: {
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    province: string;
    city: string;
  };
};

export async function createUser(data: RegisterPayload) {
  const {
    username,
    password,
    confirmPassword,
    role,
    personalInfo: {
      fullName,
      email,
      phoneNumber,
      address,
      province,
      city
    }
  } = data;

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match.");
  }

  // Check if user/email already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("Email already registered.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      fullname: fullName,
      email,
      password: hashedPassword,
      role,
      phonenumber: phoneNumber,
      address,
      province,
      city
    }
  });

  return newUser;
}
