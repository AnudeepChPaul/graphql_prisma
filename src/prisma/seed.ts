import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const data = [
  {
      title: 'Follow Prisma on Twitter',
      authors: {
        create: [
          {
            name: 'shreya',
            email: 'shreya@prisma.io',
          },
        ],
      }
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of data) {
    const book = await prisma.book.create({
      data: u,
    })
    console.log(`Created book with id: ${book.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
