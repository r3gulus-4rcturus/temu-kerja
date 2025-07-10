import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const usersToSeed = [
  {
    username: 'Naufal',
    fullname: 'Naufal Innalillahi',
    email: 'naufal@gmail.com',
    password: 'a',
    role: UserRole.jobseeker,
    phonenumber: '+6281234567890',
    address: 'Jalan Kober No -100, Depok Jawa Barat',
    province: 'Jawa Barat',
    city: 'Depok',
  },
  {
    username: 'Rafsan',
    fullname: 'Rafsan Alhamdulillah',
    email: 'rafsan@gmail.com',
    password: 'a',
    role: UserRole.jobseeker,
    phonenumber: '+6280987654321',
    address: 'Jalan Kukusan No 12093812903, Lampung, Jawa Barat',
    province: 'Jawa Barat',
    city: 'Lampung',
  },
  {
    username: 'Lanang',
    fullname: 'Lanang MasyaAllah',
    email: 'banang@gmail.com',
    password: 'a',
    role: UserRole.jobseeker,
    phonenumber: '+62123728192837',
    address: 'Jalan PB Sudirman No 0, Bogor Jawa Barat',
    province: 'Jawa Barat',
    city: 'Bogor',
  },
  {
    username: 'Helmi',
    fullname: 'Helmi Subhanallah',
    email: 'helmi@gmail.com',
    password: 'a',
    role: UserRole.jobprovider,
    phonenumber: '+6280987654321',
    address: 'Jalan Kukusan No 90, Bekasi, Jawa Barat',
    province: 'Jawa Barat',
    city: 'Bekasi',
  },
  {
    username: 'Chandra',
    fullname: 'Chandra Kadek Kadek Chandra',
    email: 'chandra@gmail.com',
    password: 'a',
    role: UserRole.jobprovider,
    phonenumber: '+6280987654321',
    address: 'Jalan Jalanan No 100, Tangerang, Banten',
    province: 'Banten',
    city: 'Tangerang',
  },
  {
    username: 'Naufal Cik',
    fullname: 'Naufal Cik Cik Cik Cik',
    email: 'cik@gmail.com',
    password: 'a',
    role: UserRole.jobprovider,
    phonenumber: '+6280987654321',
    address: 'Asrama UI, Depok, Jawa Barat',
    province: 'Jawa Barat',
    city: 'Depok',
  },
];

async function main() {
  console.log("Start seeding...");

  for (const userData of usersToSeed) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {}, // Do nothing if user exists
      create: {
        ...userData,
        password: hashedPassword,
      },
    });

    console.log(`Upserted user with email: ${user.email}`);
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