import { PrismaClient } from "@prisma-db/client";
import { withAccelerate } from '@prisma/extension-accelerate'
const prisma = new PrismaClient().$extends(withAccelerate());

export default prisma;
