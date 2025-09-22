import { PrismaClient } from '@prisma/client';

// ประกาศตัวแปร global
let prisma;

if (process.env.NODE_ENV === 'production') {
  // ใน production, สร้าง instance ใหม่
  prisma = new PrismaClient();
} else {
  // ใน development, ใช้ global instance เพื่อไม่ให้ hot-reload สร้าง connection ใหม่เรื่อยๆ
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;