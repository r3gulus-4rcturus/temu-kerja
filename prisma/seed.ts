import { PrismaClient } from "@prisma/client";  
const prisma = new PrismaClient();

// type safety: prisma udh bikin prisma type yg disimpen di node_modules/@prisma/client/index.d.ts
// const initialData: Prisma.AuthorCreateInput = [
//   {
//     email: 'alice@prisma.io',
//     name: 'Alice',
//     posts: [
//       {
//         title: 'Check out Prisma with Next.js',
//         content: 'https://www.prisma.io/nextjs',
//         published: true,
//       },
//     ],
//   },
//   {
//     email: 'bob@prisma.io',
//     name: 'Bob',
//     posts: [
//       {
//         title: 'Follow Prisma on Twitter',
//         content: 'https://twitter.com/prisma',
//         published: true,
//       },
//       {
//         title: 'Follow Nexus on Twitter',
//         content: 'https://twitter.com/nexusgql',
//         published: true,
//       },
//     ],
//   },
// ]

// upsert: if the record exists, update it; if not, create it
async function main() {
  console.log("Start seeding...")
  for (const author of [initialData]) {
    const user = await prisma.user.upsert({
      data: author
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log("Seeding finished.")
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