import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { SignUpDTO } from "../types/user";

export default class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createUser(user: SignUpDTO) {
    try {
      const dataToCreate = {
        ...user,
        role: user.role || "USER",
      };
      
      return await this.prisma.user.create({
        data: dataToCreate,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("Email already exits");
        }
      }

      throw new Error("Error creating user");
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new Error("Error getting user");
    }
  }
}
