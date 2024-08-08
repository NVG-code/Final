const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      id: "uuid-v4",
      username: "john_doe",
      password: "securepassword",
      name: "John Doe",
      email: "john@example.com",
      phonenumber: "123456789",
      pictureUrl: "http://example.com/pic.jpg",
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
