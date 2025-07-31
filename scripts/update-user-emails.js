const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateUserEmails() {
  try {
    // Update semua user yang belum punya email
    const usersWithoutEmail = await prisma.user.findMany({
      where: {
        email: null,
      },
    });

    console.log(`Found ${usersWithoutEmail.length} users without email`);

    for (const user of usersWithoutEmail) {
      const email = `${user.username}@masjid-baiturrohim.com`;

      await prisma.user.update({
        where: { id: user.id },
        data: { email },
      });

      console.log(`Updated user ${user.username} with email: ${email}`);
    }

    console.log('All users updated with email addresses');
  } catch (error) {
    console.error('Error updating user emails:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateUserEmails();
