const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create super admin
  await prisma.user.upsert({
    where: { username: 'superadmin' },
    update: {
      email: 'superadmin@masjid-baiturrohim.com', // Tambahkan email
    },
    create: {
      username: 'superadmin',
      password: hashedPassword,
      name: 'Super Administrator',
      role: 'super_admin',
      email: 'superadmin@masjid-baiturrohim.com', // Tambahkan email
    },
  });

  // Create regular admin
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {
      email: 'admin@masjid-baiturrohim.com', // Tambahkan email
    },
    create: {
      username: 'admin',
      password: hashedPassword,
      name: 'Administrator',
      role: 'admin',
      email: 'admin@masjid-baiturrohim.com', // Tambahkan email
    },
  });

  console.log('Users seeded with email addresses');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
