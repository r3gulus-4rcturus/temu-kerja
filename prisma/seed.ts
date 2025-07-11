import {
  PrismaClient,
  UserRole,
  SkillLevel,
  Workload,
  DailyDuration,
  RateType,
} from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

// Seeding data for users
const usersToSeed = [
  {
    username: "Naufal",
    fullname: "Naufal Innalillahi",
    email: "naufal@gmail.com",
    password: "a",
    role: UserRole.jobseeker,
    phonenumber: "+6281234567890",
    address: "Jalan Kober No -100, Depok Jawa Barat",
    province: "Jawa Barat",
    city: "Depok",
    avatar: "https://i.pravatar.cc/150?u=naufal",
  },
  {
    username: "Rafsan",
    fullname: "Rafsan Alhamdulillah",
    email: "rafsan@gmail.com",
    password: "a",
    role: UserRole.jobseeker,
    phonenumber: "+6280987654321",
    address: "Jalan Kukusan No 12093812903, Lampung, Jawa Barat",
    province: "Jawa Barat",
    city: "Lampung",
    avatar: "https://i.pravatar.cc/150?u=rafsan",
  },
  {
    username: "Lanang",
    fullname: "Lanang MasyaAllah",
    email: "banang@gmail.com",
    password: "a",
    role: UserRole.jobseeker,
    phonenumber: "+62123728192837",
    address: "Jalan PB Sudirman No 0, Bogor Jawa Barat",
    province: "Jawa Barat",
    city: "Bogor",
    avatar: "https://i.pravatar.cc/150?u=lanang",
  },
  {
    username: "Siti",
    fullname: "Siti Lestari",
    email: "siti@gmail.com",
    password: "a",
    role: UserRole.jobseeker,
    phonenumber: "+6281122334455",
    address: "Jalan Melati No 10, Surabaya",
    province: "Jawa Timur",
    city: "Surabaya",
    avatar: "https://i.pravatar.cc/150?u=siti",
  },
  {
    username: "Dewi",
    fullname: "Dewi Anggraini",
    email: "dewi@gmail.com",
    password: "a",
    role: UserRole.jobseeker,
    phonenumber: "+6282233445566",
    address: "Jalan Dago Atas No 25, Bandung",
    province: "Jawa Barat",
    city: "Bandung",
    avatar: "https://i.pravatar.cc/150?u=dewi",
  },
  {
    username: "Budi",
    fullname: "Budi Santoso",
    email: "budi@gmail.com",
    password: "a",
    role: UserRole.jobseeker,
    phonenumber: "+6283344556677",
    address: "Jalan Malioboro No 1, Yogyakarta",
    province: "DI Yogyakarta",
    city: "Yogyakarta",
    avatar: "https://i.pravatar.cc/150?u=budi",
  },
  {
    username: "Agus",
    fullname: "Agus Setiawan",
    email: "agus@gmail.com",
    password: "a",
    role: UserRole.jobseeker,
    phonenumber: "+6284455667788",
    address: "Jalan Pahlawan No 5, Semarang",
    province: "Jawa Tengah",
    city: "Semarang",
    avatar: "https://i.pravatar.cc/150?u=agus",
  },
  // Job Providers
  {
    username: "Helmi",
    fullname: "Helmi Subhanallah",
    email: "helmi@gmail.com",
    password: "a",
    role: UserRole.jobprovider,
    phonenumber: "+6285566778899",
    address: "Jalan Kukusan No 90, Bekasi, Jawa Barat",
    province: "Jawa Barat",
    city: "Bekasi",
    avatar: "https://i.pravatar.cc/150?u=helmi",
  },
  {
    username: "Naufal Cik",
    fullname: "Naufal Cik Cik Cik Cik",
    email: "cik@gmail.com",
    password: "a",
    role: UserRole.jobprovider,
    phonenumber: "+6287788990011",
    address: "Asrama UI, Depok, Jawa Barat",
    province: "Jawa Barat",
    city: "Depok",
    avatar: "https://i.pravatar.cc/150?u=cik",
  },
  {
    username: "Rina",
    fullname: "Rina Hartono",
    email: "rina@gmail.com",
    password: "a",
    role: UserRole.jobprovider,
    phonenumber: "+6288899001122",
    address: "Jalan Senopati No 50, Jakarta Selatan",
    province: "DKI Jakarta",
    city: "Jakarta Selatan",
    avatar: "https://i.pravatar.cc/150?u=rina",
  },
  {
    username: "Joko",
    fullname: "Joko Susilo",
    email: "joko@gmail.com",
    password: "a",
    role: UserRole.jobprovider,
    phonenumber: "+6289900112233",
    address: "Jalan Gatot Subroto No 12, Medan",
    province: "Sumatera Utara",
    city: "Medan",
    avatar: "https://i.pravatar.cc/150?u=joko",
  },
  {
    username: "Lina",
    fullname: "Lina Marlina",
    email: "lina@gmail.com",
    password: "a",
    role: UserRole.jobprovider,
    phonenumber: "+6281122334456",
    address: "Jalan Sultan Hasanuddin No 8, Makassar",
    province: "Sulawesi Selatan",
    city: "Makassar",
    avatar: "https://i.pravatar.cc/150?u=lina",
  },
  {
    username: "Eko",
    fullname: "Eko Prasetyo",
    email: "eko@gmail.com",
    password: "a",
    role: UserRole.jobprovider,
    phonenumber: "+6282233445567",
    address: "Jalan Jenderal Sudirman No 3, Palembang",
    province: "Sumatera Selatan",
    city: "Palembang",
    avatar: "https://i.pravatar.cc/150?u=eko",
  },
]

// Hardcoded jobs, referencing provider by email
const jobsToSeed = [
  {
    providerEmail: "helmi@gmail.com",
    title: "Perbaikan Atap Bocor",
    description:
      "Dibutuhkan segera tukang untuk memperbaiki atap yang bocor di area Bekasi.",
    categories: ["Tukang", "Perbaikan Rumah"],
    location: "Bekasi, Jawa Barat",
    priceRate: 150000,
    dateTime: new Date("2025-07-20T09:00:00Z"),
  },
  {
    providerEmail: "cik@gmail.com",
    title: "Montir Panggilan Darurat",
    description:
      "Dibutuhkan montir untuk perbaikan motor mogok di sekitar Depok.",
    categories: ["Montir", "Otomotif"],
    location: "Depok, Jawa Barat",
    priceRate: 85000,
    dateTime: new Date("2025-07-19T11:00:00Z"),
  },
  {
    providerEmail: "rina@gmail.com",
    title: "Asisten Rumah Tangga Harian",
    description:
      "Mencari ART harian untuk bersih-bersih dan memasak di area Jakarta Selatan.",
    categories: ["ART", "Rumah Tangga"],
    location: "Jakarta Selatan, DKI Jakarta",
    priceRate: 200000,
    dateTime: new Date("2025-08-01T08:00:00Z"),
  },
  {
    providerEmail: "joko@gmail.com",
    title: "Tukang Cat Tembok Profesional",
    description:
      "Dibutuhkan tukang cat untuk proyek pengecatan rumah 2 lantai di Medan.",
    categories: ["Tukang", "Konstruksi"],
    location: "Medan, Sumatera Utara",
    priceRate: 250000,
    dateTime: new Date("2025-08-05T09:00:00Z"),
  },
  {
    providerEmail: "lina@gmail.com",
    title: "Jasa Angkut Barang Pindahan",
    description:
      "Menyediakan jasa angkut barang untuk pindahan rumah di Makassar dan sekitarnya.",
    categories: ["Logistik", "Pindahan"],
    location: "Makassar, Sulawesi Selatan",
    priceRate: 300000,
    dateTime: new Date("2025-08-10T10:00:00Z"),
  },
  {
    providerEmail: "eko@gmail.com",
    title: "Perbaikan AC dan Kulkas",
    description: "Ahli perbaikan AC dan kulkas panggilan untuk area Palembang.",
    categories: ["Teknisi", "Elektronik"],
    location: "Palembang, Sumatera Selatan",
    priceRate: 120000,
    dateTime: new Date("2025-08-12T13:00:00Z"),
  },
]

// Hardcoded applications, referencing seeker by email
const applicationsToSeed = [
  {
    seekerEmail: "naufal@gmail.com",
    name: "Lamaran Jasa Tukang",
    description: "Berpengalaman dalam perbaikan rumah, siap bekerja.",
    tags: ["Tukang", "Handyman"],
    skillLevel: SkillLevel.profesional,
    workload: Workload.pekerjaan_sedang,
    dailyDuration: DailyDuration.SIX_HOURS,
    rateType: RateType.fixed,
    minRate: 120000,
    maxRate: 180000,
  },
  {
    seekerEmail: "rafsan@gmail.com",
    name: "Lamaran Jasa Kebun",
    description: "Suka berkebun dan telaten merawat tanaman.",
    tags: ["Kebun", "Tanaman"],
    skillLevel: SkillLevel.menengah,
    workload: Workload.pekerjaan_kecil,
    dailyDuration: DailyDuration.THREE_TO_SIX,
    rateType: RateType.hourly,
    minRate: 45000,
    maxRate: 60000,
  },
  {
    seekerEmail: "banang@gmail.com",
    name: "Lamaran Montir",
    description: "Bisa memperbaiki berbagai jenis motor, pengalaman 5 tahun.",
    tags: ["Montir", "Servis Motor"],
    skillLevel: SkillLevel.profesional,
    workload: Workload.pekerjaan_kecil,
    dailyDuration: DailyDuration.THREE_HOURS,
    rateType: RateType.hourly,
    minRate: 60000,
    maxRate: 90000,
  },
  {
    seekerEmail: "siti@gmail.com",
    name: "Lamaran Asisten Rumah Tangga",
    description: "Pengalaman 2 tahun sebagai ART, rajin dan jujur.",
    tags: ["ART", "Bersih-bersih"],
    skillLevel: SkillLevel.menengah,
    workload: Workload.pekerjaan_sedang,
    dailyDuration: DailyDuration.SIX_HOURS,
    rateType: RateType.fixed,
    minRate: 180000,
    maxRate: 220000,
  },
  {
    seekerEmail: "dewi@gmail.com",
    name: "Lamaran Penjahit Pakaian",
    description:
      "Bisa membuat berbagai model pakaian wanita, memiliki mesin jahit sendiri.",
    tags: ["Penjahit", "Fashion"],
    skillLevel: SkillLevel.profesional,
    workload: Workload.pekerjaan_sedang,
    dailyDuration: DailyDuration.THREE_TO_SIX,
    rateType: RateType.hourly,
    minRate: 50000,
    maxRate: 75000,
  },
  {
    seekerEmail: "budi@gmail.com",
    name: "Lamaran Jasa Fotografi Acara",
    description:
      "Menawarkan jasa fotografi untuk acara pernikahan, ulang tahun, dll.",
    tags: ["Fotografi", "Acara"],
    skillLevel: SkillLevel.profesional,
    workload: Workload.pekerjaan_besar,
    dailyDuration: DailyDuration.SIX_HOURS,
    rateType: RateType.fixed,
    minRate: 500000,
    maxRate: 1000000,
  },
  {
    seekerEmail: "agus@gmail.com",
    name: "Lamaran Driver Pribadi",
    description: "Memiliki SIM A dan C, berpengalaman sebagai driver pribadi selama 3 tahun.",
    tags: ["Driver", "Transportasi"],
    skillLevel: SkillLevel.menengah,
    workload: Workload.pekerjaan_sedang,
    dailyDuration: DailyDuration.SIX_HOURS,
    rateType: RateType.fixed,
    minRate: 200000,
    maxRate: 250000,
  },
]

async function main() {
  console.log("Start seeding...")

  for (const userData of usersToSeed) {
    const hashedPassword = await bcrypt.hash(userData.password, 10)

    await prisma.user.upsert({
      where: { email: userData.email },
      update: {}, // Do nothing if user exists
      create: {
        ...userData,
        password: hashedPassword,
      },
    })
    console.log(`Upserted user with email: ${userData.email}`)
  }

  for (const jobData of jobsToSeed) {
    const provider = await prisma.user.findUnique({
      where: { email: jobData.providerEmail },
    })
    if (provider) {
      await prisma.job.create({
        data: {
          title: jobData.title,
          description: jobData.description,
          categories: jobData.categories,
          location: jobData.location,
          priceRate: jobData.priceRate,
          dateTime: jobData.dateTime,
          providerId: provider.id,
        },
      })
      console.log(`Created job: ${jobData.title}`)
    }
  }

  for (const appData of applicationsToSeed) {
    const seeker = await prisma.user.findUnique({
      where: { email: appData.seekerEmail },
    })
    if (seeker) {
      await prisma.application.create({
        data: {
          name: appData.name,
          description: appData.description,
          tags: appData.tags,
          skillLevel: appData.skillLevel,
          workload: appData.workload,
          dailyDuration: appData.dailyDuration,
          rateType: appData.rateType,
          minRate: appData.minRate,
          maxRate: appData.maxRate,
          seekerId: seeker.id,
        },
      })
      console.log(`Created application for: ${appData.seekerEmail}`)
    }
  }

  console.log("Seeding finished.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
