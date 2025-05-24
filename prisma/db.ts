import { PrismaClient } from "../generated/prisma";
import "dotenv/config";

export const PrismaClientInstance = new PrismaClient();
