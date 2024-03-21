const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany()

  for (let user of users) {
    await prisma.user.update({
      where: { id: user.id },
      data: { role: user.role ? user.role : 'simpleUser' },  // If 'role' is null, set it to 'defaultRoleValue'
    })
  }
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
