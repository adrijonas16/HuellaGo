import { PrismaClient, UserRole, PetType, PetSize, EnergyLevel, BusinessCategory, BusinessStatus, EventStatus, RouteDifficulty, PromotionType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

/** Fechas relativas a hoy: así los eventos sembrados siempre son futuros */
function daysFromNow(days: number, time = '10:00'): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const [h, m] = time.split(':').map(Number);
  // Hora de Perú (UTC-5), sin importar la zona horaria del servidor
  d.setUTCHours(h + 5, m, 0, 0);
  return d;
}

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clean existing data
  await prisma.$transaction([
    prisma.postComment.deleteMany(),
    prisma.postLike.deleteMany(),
    prisma.post.deleteMany(),
    prisma.notification.deleteMany(),
    prisma.follow.deleteMany(),
    prisma.favorite.deleteMany(),
    prisma.review.deleteMany(),
    prisma.photo.deleteMany(),
    prisma.eventAttendance.deleteMany(),
    prisma.eventInvitation.deleteMany(),
    prisma.event.deleteMany(),
    prisma.walk.deleteMany(),
    prisma.route.deleteMany(),
    prisma.promotion.deleteMany(),
    prisma.businessService.deleteMany(),
    prisma.businessHour.deleteMany(),
    prisma.business.deleteMany(),
    prisma.petVaccine.deleteMany(),
    prisma.pet.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const passwordHash = await bcrypt.hash('HuellaGo2026!', 10);

  // ==================== USERS ====================
  console.log('Creating users...');

  const admin = await prisma.user.create({
    data: {
      email: 'admin@huellago.pe',
      passwordHash,
      firstName: 'Admin',
      lastName: 'HuellaGo',
      phone: '51999000000',
      city: 'Arequipa',
      district: 'Cercado',
      role: UserRole.ADMIN,
    },
  });

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'maria.garcia@gmail.com',
        passwordHash,
        firstName: 'María',
        lastName: 'García Quispe',
        phone: '51954111222',
        city: 'Arequipa',
        district: 'Cayma',
        role: UserRole.OWNER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'carlos.mamani@gmail.com',
        passwordHash,
        firstName: 'Carlos',
        lastName: 'Mamani López',
        phone: '51954333444',
        city: 'Arequipa',
        district: 'Yanahuara',
        role: UserRole.OWNER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'lucia.flores@gmail.com',
        passwordHash,
        firstName: 'Lucía',
        lastName: 'Flores Condori',
        phone: '51954555666',
        city: 'Arequipa',
        district: 'Cerro Colorado',
        role: UserRole.OWNER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'andres.ramos@gmail.com',
        passwordHash,
        firstName: 'Andrés',
        lastName: 'Ramos Vizcarra',
        phone: '51954777888',
        city: 'Arequipa',
        district: 'José Luis Bustamante y Rivero',
        role: UserRole.OWNER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'sofia.arias@gmail.com',
        passwordHash,
        firstName: 'Sofía',
        lastName: 'Arias Delgado',
        phone: '51954999000',
        city: 'Arequipa',
        district: 'Sachaca',
        role: UserRole.OWNER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'diego.mendoza@gmail.com',
        passwordHash,
        firstName: 'Diego',
        lastName: 'Mendoza Paredes',
        phone: '51955111222',
        city: 'Arequipa',
        district: 'Miraflores',
        role: UserRole.BUSINESS,
      },
    }),
    prisma.user.create({
      data: {
        email: 'camila.vargas@gmail.com',
        passwordHash,
        firstName: 'Camila',
        lastName: 'Vargas Zegarra',
        phone: '51955333444',
        city: 'Arequipa',
        district: 'Cercado',
        role: UserRole.ORGANIZER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'pedro.huanca@gmail.com',
        passwordHash,
        firstName: 'Pedro',
        lastName: 'Huanca Salas',
        phone: '51955555666',
        city: 'Arequipa',
        district: 'Paucarpata',
        role: UserRole.OWNER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'valentina.rojas@gmail.com',
        passwordHash,
        firstName: 'Valentina',
        lastName: 'Rojas Caceres',
        phone: '51955777888',
        city: 'Arequipa',
        district: 'Cayma',
        role: UserRole.OWNER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'jose.gutierrez@gmail.com',
        passwordHash,
        firstName: 'José',
        lastName: 'Gutierrez Alvarez',
        phone: '51955999000',
        city: 'Arequipa',
        district: 'Mariano Melgar',
        role: UserRole.OWNER,
      },
    }),
  ]);

  const [maria, carlos, lucia, andres, sofia, diego, camila, pedro, valentina, jose] = users;

  // ==================== PETS ====================
  console.log('Creating pets...');

  const pets = await Promise.all([
    prisma.pet.create({ data: { userId: maria.id, name: 'Luna', petType: PetType.DOG, breed: 'Golden Retriever', size: PetSize.LARGE, energyLevel: EnergyLevel.HIGH, weight: 28, birthDate: new Date('2022-03-15') } }),
    prisma.pet.create({ data: { userId: maria.id, name: 'Michi', petType: PetType.CAT, breed: 'Gato Mestizo', size: PetSize.SMALL, energyLevel: EnergyLevel.LOW, weight: 4, birthDate: new Date('2023-01-10') } }),
    prisma.pet.create({ data: { userId: carlos.id, name: 'Rocky', petType: PetType.DOG, breed: 'Pastor Alemán', size: PetSize.LARGE, energyLevel: EnergyLevel.HIGH, weight: 32, birthDate: new Date('2021-07-20') } }),
    prisma.pet.create({ data: { userId: lucia.id, name: 'Pelusa', petType: PetType.DOG, breed: 'Shih Tzu', size: PetSize.SMALL, energyLevel: EnergyLevel.LOW, weight: 5, birthDate: new Date('2023-06-01') } }),
    prisma.pet.create({ data: { userId: lucia.id, name: 'Copito', petType: PetType.RABBIT, breed: 'Holland Lop', size: PetSize.SMALL, energyLevel: EnergyLevel.LOW, weight: 1.8, birthDate: new Date('2024-02-14') } }),
    prisma.pet.create({ data: { userId: andres.id, name: 'Max', petType: PetType.DOG, breed: 'Labrador', size: PetSize.LARGE, energyLevel: EnergyLevel.HIGH, weight: 30, birthDate: new Date('2022-11-05') } }),
    prisma.pet.create({ data: { userId: sofia.id, name: 'Canela', petType: PetType.DOG, breed: 'Cocker Spaniel', size: PetSize.MEDIUM, energyLevel: EnergyLevel.MEDIUM, weight: 12, birthDate: new Date('2023-04-22') } }),
    prisma.pet.create({ data: { userId: pedro.id, name: 'Thor', petType: PetType.DOG, breed: 'Rottweiler', size: PetSize.GIANT, energyLevel: EnergyLevel.HIGH, weight: 42, birthDate: new Date('2021-09-10') } }),
    prisma.pet.create({ data: { userId: valentina.id, name: 'Nala', petType: PetType.DOG, breed: 'Beagle', size: PetSize.MEDIUM, energyLevel: EnergyLevel.HIGH, weight: 10, birthDate: new Date('2023-08-30') } }),
    prisma.pet.create({ data: { userId: valentina.id, name: 'Miso', petType: PetType.CAT, breed: 'Siamés', size: PetSize.SMALL, energyLevel: EnergyLevel.MEDIUM, weight: 3.5, birthDate: new Date('2024-01-20') } }),
    prisma.pet.create({ data: { userId: jose.id, name: 'Toby', petType: PetType.DOG, breed: 'Mestizo', size: PetSize.MEDIUM, energyLevel: EnergyLevel.MEDIUM, weight: 15, birthDate: new Date('2022-05-12') } }),
    prisma.pet.create({ data: { userId: diego.id, name: 'Rex', petType: PetType.DOG, breed: 'Bulldog Francés', size: PetSize.SMALL, energyLevel: EnergyLevel.LOW, weight: 11, birthDate: new Date('2023-12-01') } }),
  ]);

  const [luna, michi, rocky, pelusa, copito, max, canela, thor, nala, miso, toby, rex] = pets;

  // ==================== BUSINESSES (Arequipa real data) ====================
  console.log('Creating businesses...');

  const weekdayHours = (bizId: string) => [
    { businessId: bizId, dayOfWeek: 1, openTime: '08:00', closeTime: '20:00', isClosed: false },
    { businessId: bizId, dayOfWeek: 2, openTime: '08:00', closeTime: '20:00', isClosed: false },
    { businessId: bizId, dayOfWeek: 3, openTime: '08:00', closeTime: '20:00', isClosed: false },
    { businessId: bizId, dayOfWeek: 4, openTime: '08:00', closeTime: '20:00', isClosed: false },
    { businessId: bizId, dayOfWeek: 5, openTime: '08:00', closeTime: '20:00', isClosed: false },
    { businessId: bizId, dayOfWeek: 6, openTime: '09:00', closeTime: '14:00', isClosed: false },
    { businessId: bizId, dayOfWeek: 0, openTime: '', closeTime: '', isClosed: true },
  ];

  // --- Veterinarias ---
  const vetCerroColorado = await prisma.business.create({
    data: {
      ownerId: diego.id,
      name: 'Veterinaria El Arca de Noe',
      description: 'Clínica veterinaria con más de 15 años de experiencia en Arequipa. Atención de perros, gatos, conejos y aves. Consultas, vacunación, cirugía, laboratorio y rayos X. Emergencias disponibles.',
      category: BusinessCategory.VETERINARY,
      categories: [BusinessCategory.VETERINARY, BusinessCategory.GROOMING],
      petTypes: [PetType.DOG, PetType.CAT, PetType.RABBIT, PetType.BIRD],
      businessStatus: BusinessStatus.APPROVED,
      phone: '054-271234',
      whatsapp: '51954271234',
      instagram: '@elarcadenoe_aqp',
      facebook: 'elarcadenoeaqp',
      address: 'Av. Ejército 1205, Cerro Colorado',
      city: 'Arequipa',
      district: 'Cerro Colorado',
      latitude: -16.3876,
      longitude: -71.5707,
      is24Hours: false,
      isVerified: true,
      priceRange: 'S/ 30 - S/ 300',
    },
  });

  const vetCayma = await prisma.business.create({
    data: {
      ownerId: diego.id,
      name: 'Clínica Veterinaria San Francisco de Asis',
      description: 'Clínica veterinaria integral en Cayma. Medicina preventiva, cirugía, hospitalización, ecografia y farmacia veterinaria. Atendemos todo tipo de mascotas.',
      category: BusinessCategory.VETERINARY,
      categories: [BusinessCategory.VETERINARY],
      petTypes: [PetType.DOG, PetType.CAT, PetType.RABBIT, PetType.HAMSTER],
      businessStatus: BusinessStatus.APPROVED,
      phone: '054-254567',
      whatsapp: '51954254567',
      instagram: '@vetsanfrancisco_aqp',
      address: 'Av. Cayma 612, Cayma',
      city: 'Arequipa',
      district: 'Cayma',
      latitude: -16.3835,
      longitude: -71.5490,
      is24Hours: false,
      isVerified: true,
      priceRange: 'S/ 35 - S/ 350',
    },
  });

  const vetEmergencia = await prisma.business.create({
    data: {
      ownerId: diego.id,
      name: 'VetEmergencias Arequipa',
      description: 'Clínica veterinaria de emergencias 24 horas. Atención inmediata, cirugía de urgencia, cuidados intensivos. No dejes que tu mascota espere.',
      category: BusinessCategory.EMERGENCY_CLINIC,
      categories: [BusinessCategory.EMERGENCY_CLINIC, BusinessCategory.VETERINARY],
      petTypes: [PetType.DOG, PetType.CAT],
      businessStatus: BusinessStatus.APPROVED,
      phone: '054-600123',
      whatsapp: '51954600123',
      instagram: '@vetemergencias_aqp',
      address: 'Calle Mercaderes 318, Cercado',
      city: 'Arequipa',
      district: 'Cercado',
      latitude: -16.3989,
      longitude: -71.5370,
      is24Hours: true,
      isVerified: true,
      priceRange: 'S/ 50 - S/ 500',
    },
  });

  const vetYanahuara = await prisma.business.create({
    data: {
      ownerId: carlos.id,
      name: 'Veterinaria Pet Care Yanahuara',
      description: 'Veterinaria moderna en el corazon de Yanahuara. Consultas, vacunas, desparasitación, baño medicado, cirugía y hospitalización. Especialistas en dermatologia canina.',
      category: BusinessCategory.VETERINARY,
      categories: [BusinessCategory.VETERINARY, BusinessCategory.GROOMING],
      petTypes: [PetType.DOG, PetType.CAT, PetType.RABBIT],
      businessStatus: BusinessStatus.APPROVED,
      phone: '054-272890',
      whatsapp: '51954272890',
      instagram: '@petcare_yanahuara',
      facebook: 'petcareyanahuara',
      address: 'Av. Ejército 409, Yanahuara',
      city: 'Arequipa',
      district: 'Yanahuara',
      latitude: -16.3920,
      longitude: -71.5500,
      is24Hours: false,
      isVerified: true,
      priceRange: 'S/ 30 - S/ 280',
    },
  });

  const vetJlbyr = await prisma.business.create({
    data: {
      ownerId: andres.id,
      name: 'Centro Veterinario Mi Mascota Feliz',
      description: 'Centro veterinario completo en JLByR. Vacunación, desparasitación, esterilización, laboratorio clinico y farmacia. Precios accesibles para toda la familia.',
      category: BusinessCategory.VETERINARY,
      categories: [BusinessCategory.VETERINARY],
      petTypes: [PetType.DOG, PetType.CAT, PetType.BIRD, PetType.HAMSTER],
      businessStatus: BusinessStatus.APPROVED,
      phone: '054-431567',
      whatsapp: '51954431567',
      address: 'Av. Dolores 145, José Luis Bustamante y Rivero',
      city: 'Arequipa',
      district: 'José Luis Bustamante y Rivero',
      latitude: -16.4220,
      longitude: -71.5250,
      is24Hours: false,
      isVerified: false,
      priceRange: 'S/ 25 - S/ 200',
    },
  });

  const vetMiraflores = await prisma.business.create({
    data: {
      ownerId: diego.id,
      name: 'Veterinaria Huellitas de Amor',
      description: 'Veterinaria familiar en Miraflores. Nos especializamos en medicina preventiva, control de peso, vacunación y odontologia veterinaria. Tu mascota en buenas manos.',
      category: BusinessCategory.VETERINARY,
      categories: [BusinessCategory.VETERINARY],
      petTypes: [PetType.DOG, PetType.CAT],
      businessStatus: BusinessStatus.APPROVED,
      phone: '054-255890',
      whatsapp: '51954255890',
      instagram: '@huellitasdeamor_aqp',
      address: 'Av. Mariscal Castilla 502, Miraflores',
      city: 'Arequipa',
      district: 'Miraflores',
      latitude: -16.4100,
      longitude: -71.5320,
      is24Hours: false,
      isVerified: true,
      priceRange: 'S/ 30 - S/ 250',
    },
  });

  // --- Grooming ---
  const groomingPaws = await prisma.business.create({
    data: {
      ownerId: sofia.id,
      name: 'Happy Paws Grooming',
      description: 'Spa y peluquería canina premium en Cayma. Baño completo, corte de pelo, limpieza de oidos, corte de uñas, spa con aromaterapia. Tu mascota saldra como nueva.',
      category: BusinessCategory.GROOMING,
      categories: [BusinessCategory.GROOMING],
      petTypes: [PetType.DOG, PetType.CAT],
      businessStatus: BusinessStatus.APPROVED,
      phone: '054-257123',
      whatsapp: '51954257123',
      instagram: '@happypaws_aqp',
      address: 'Calle Bolognesi 230, Cayma',
      city: 'Arequipa',
      district: 'Cayma',
      latitude: -16.3850,
      longitude: -71.5470,
      is24Hours: false,
      isVerified: true,
      priceRange: 'S/ 25 - S/ 80',
    },
  });

  const groomingPetStyle = await prisma.business.create({
    data: {
      ownerId: sofia.id,
      name: 'Pet Style Arequipa',
      description: 'Grooming profesional con productos premium. Especializados en razas pequeñas y medianas. Baño, corte, deslanado, tintura creativa y tratamientos de piel.',
      category: BusinessCategory.GROOMING,
      categories: [BusinessCategory.GROOMING, BusinessCategory.STORE],
      petTypes: [PetType.DOG],
      businessStatus: BusinessStatus.APPROVED,
      whatsapp: '51954890123',
      instagram: '@petstyle_aqp',
      address: 'Av. Parra 315, Cercado',
      city: 'Arequipa',
      district: 'Cercado',
      latitude: -16.4050,
      longitude: -71.5340,
      is24Hours: false,
      isVerified: false,
      priceRange: 'S/ 30 - S/ 90',
    },
  });

  // --- Tiendas ---
  const storePetShop = await prisma.business.create({
    data: {
      ownerId: diego.id,
      name: 'PetShop Arequipa',
      description: 'La tienda de mascotas más completa de Arequipa. Alimentos premium, accesorios, juguetes, ropa, camas, transportadoras y más. Marcas: Royal Canin, Hills, Pro Plan.',
      category: BusinessCategory.STORE,
      categories: [BusinessCategory.STORE],
      petTypes: [PetType.DOG, PetType.CAT, PetType.RABBIT, PetType.BIRD, PetType.HAMSTER, PetType.FISH],
      businessStatus: BusinessStatus.APPROVED,
      phone: '054-234890',
      whatsapp: '51954234890',
      instagram: '@petshop_aqp',
      facebook: 'petshopaqp',
      website: 'https://petshopaqp.pe',
      address: 'Av. Ejército 803, Cayma',
      city: 'Arequipa',
      district: 'Cayma',
      latitude: -16.3860,
      longitude: -71.5550,
      is24Hours: false,
      isVerified: true,
      priceRange: 'S/ 5 - S/ 500',
    },
  });

  // --- Hoteles ---
  const hotelPet = await prisma.business.create({
    data: {
      ownerId: sofia.id,
      name: 'Hotel Canino El Paraiso',
      description: 'Hotel y guardería canina con amplias areas verdes. Habitaciones individuales, camaras en vivo, paseos diarios, alimentacion premium. Tu mascota de vacaciones mientras tu viajas.',
      category: BusinessCategory.HOTEL,
      categories: [BusinessCategory.HOTEL, BusinessCategory.DAYCARE],
      petTypes: [PetType.DOG, PetType.CAT],
      businessStatus: BusinessStatus.APPROVED,
      phone: '054-445678',
      whatsapp: '51954445678',
      instagram: '@hotelcanino_paraiso',
      address: 'Calle Los Arces 150, Sachaca',
      city: 'Arequipa',
      district: 'Sachaca',
      latitude: -16.4160,
      longitude: -71.5700,
      is24Hours: true,
      isVerified: true,
      priceRange: 'S/ 35 - S/ 80 por noche',
    },
  });

  // --- Paseadores ---
  const walker = await prisma.business.create({
    data: {
      ownerId: pedro.id,
      name: 'PaseosPet Arequipa',
      description: 'Servicio profesional de paseos para perros. Paseos individuales y grupales (max 4 perros). Cubrimos Cayma, Yanahuara, Cercado y Cerro Colorado. GPS tracking en cada paseo.',
      category: BusinessCategory.WALKER,
      categories: [BusinessCategory.WALKER],
      petTypes: [PetType.DOG],
      businessStatus: BusinessStatus.APPROVED,
      whatsapp: '51954667890',
      instagram: '@paseospet_aqp',
      address: 'Servicio a domicilio, Arequipa',
      city: 'Arequipa',
      district: 'Cayma',
      latitude: -16.3876,
      longitude: -71.5507,
      is24Hours: false,
      isVerified: true,
      priceRange: 'S/ 15 - S/ 30 por paseo',
    },
  });

  // --- Entrenadores ---
  const trainer = await prisma.business.create({
    data: {
      ownerId: pedro.id,
      name: 'K9 Arequipa - Entrenamiento Canino',
      description: 'Entrenamiento canino profesional con metodo positivo. Obediencia basica, socializacion, correccion de conducta, agility. Clases individuales y grupales en parque.',
      category: BusinessCategory.TRAINER,
      categories: [BusinessCategory.TRAINER],
      petTypes: [PetType.DOG],
      businessStatus: BusinessStatus.APPROVED,
      whatsapp: '51954778901',
      instagram: '@k9_arequipa',
      facebook: 'k9arequipa',
      address: 'Parque Selva Alegre, Cercado (punto de encuentro)',
      city: 'Arequipa',
      district: 'Cercado',
      latitude: -16.3950,
      longitude: -71.5345,
      is24Hours: false,
      isVerified: true,
      priceRange: 'S/ 50 - S/ 200 por sesión',
    },
  });

  // --- Refugios ---
  const shelter1 = await prisma.business.create({
    data: {
      ownerId: camila.id,
      name: 'Refugio Patitas Sin Hogar',
      description: 'Refugio de rescate y adopción de perros y gatos callejeros en Arequipa. Rescatamos, rehabilitamos y buscamos familias responsables. Campanas de esterilización gratuitas.',
      category: BusinessCategory.SHELTER,
      categories: [BusinessCategory.SHELTER],
      petTypes: [PetType.DOG, PetType.CAT],
      businessStatus: BusinessStatus.APPROVED,
      whatsapp: '51954889012',
      instagram: '@patitassinhogar_aqp',
      facebook: 'patitassinhogaraqp',
      address: 'Calle Los Nogales 280, Sachaca',
      city: 'Arequipa',
      district: 'Sachaca',
      latitude: -16.4180,
      longitude: -71.5650,
      is24Hours: false,
      isVerified: true,
      priceRange: 'Adopción gratuita',
    },
  });

  const shelter2 = await prisma.business.create({
    data: {
      ownerId: camila.id,
      name: 'Rescate Animal AQP',
      description: 'Organización dedicada al rescate de animales en situación de abandono y maltrato. Perros, gatos y conejos. Programa de adopción responsable, hogares temporales y educación.',
      category: BusinessCategory.SHELTER,
      categories: [BusinessCategory.SHELTER],
      petTypes: [PetType.DOG, PetType.CAT, PetType.RABBIT],
      businessStatus: BusinessStatus.APPROVED,
      whatsapp: '51954990123',
      instagram: '@rescateanimal_aqp',
      facebook: 'rescateanimalaqp',
      address: 'Av. Paisajista s/n, Cerro Colorado',
      city: 'Arequipa',
      district: 'Cerro Colorado',
      latitude: -16.3780,
      longitude: -71.5800,
      is24Hours: false,
      isVerified: true,
      priceRange: 'Adopción gratuita',
    },
  });

  // Create hours for all businesses
  const allBusinesses = [vetCerroColorado, vetCayma, vetEmergencia, vetYanahuara, vetJlbyr, vetMiraflores, groomingPaws, groomingPetStyle, storePetShop, hotelPet, walker, trainer, shelter1, shelter2];
  for (const biz of allBusinesses) {
    const hours = biz.is24Hours
      ? Array.from({ length: 7 }, (_, i) => ({ businessId: biz.id, dayOfWeek: i, openTime: '00:00', closeTime: '23:59', isClosed: false }))
      : weekdayHours(biz.id);
    await prisma.businessHour.createMany({ data: hours });
  }

  // ==================== SERVICES ====================
  console.log('Creating services...');

  await prisma.businessService.createMany({
    data: [
      // Vet services
      { businessId: vetCerroColorado.id, category: BusinessCategory.VETERINARY, name: 'Consulta general', description: 'Revision completa de tu mascota', price: 35, duration: 30 },
      { businessId: vetCerroColorado.id, category: BusinessCategory.VETERINARY, name: 'Vacunación', description: 'Vacunas quintuple, sextuple, antirrabica', price: 45, duration: 15 },
      { businessId: vetCerroColorado.id, category: BusinessCategory.VETERINARY, name: 'Esterilización', description: 'Cirugia de esterilización perros y gatos', price: 180, duration: 60 },
      { businessId: vetCerroColorado.id, category: BusinessCategory.VETERINARY, name: 'Ecografia', description: 'Ecografia abdominal', price: 100, duration: 30 },
      { businessId: vetCerroColorado.id, category: BusinessCategory.GROOMING, name: 'Baño básico', description: 'Baño con shampoo hipoalergenico', price: 25, duration: 45 },
      { businessId: vetCayma.id, category: BusinessCategory.VETERINARY, name: 'Consulta general', price: 40, duration: 30 },
      { businessId: vetCayma.id, category: BusinessCategory.VETERINARY, name: 'Cirugia menor', price: 150, duration: 45 },
      { businessId: vetCayma.id, category: BusinessCategory.VETERINARY, name: 'Hospitalizacion', description: 'Por día, incluye monitoreo', price: 80, duration: 1440 },
      { businessId: vetEmergencia.id, category: BusinessCategory.EMERGENCY_CLINIC, name: 'Emergencia', description: 'Atención de emergencia 24/7', price: 80, duration: 30 },
      { businessId: vetEmergencia.id, category: BusinessCategory.EMERGENCY_CLINIC, name: 'Cirugia de urgencia', price: 350, duration: 90 },
      { businessId: vetYanahuara.id, category: BusinessCategory.VETERINARY, name: 'Consulta dermatologica', description: 'Especialista en piel', price: 60, duration: 40 },
      { businessId: vetYanahuara.id, category: BusinessCategory.VETERINARY, name: 'Desparasitación', price: 25, duration: 15 },
      // Grooming services
      { businessId: groomingPaws.id, category: BusinessCategory.GROOMING, name: 'Baño completo', description: 'Baño, secado, perfume', price: 30, duration: 60 },
      { businessId: groomingPaws.id, category: BusinessCategory.GROOMING, name: 'Baño + corte', description: 'Baño completo y corte segun raza', price: 50, duration: 90 },
      { businessId: groomingPaws.id, category: BusinessCategory.GROOMING, name: 'Spa premium', description: 'Baño, corte, limpieza oidos, uñas, aromaterapia', price: 75, duration: 120 },
      { businessId: groomingPetStyle.id, category: BusinessCategory.GROOMING, name: 'Baño y corte', price: 45, duration: 90 },
      { businessId: groomingPetStyle.id, category: BusinessCategory.GROOMING, name: 'Deslanado', description: 'Remocion de pelo muerto', price: 60, duration: 120 },
      // Hotel
      { businessId: hotelPet.id, category: BusinessCategory.HOTEL, name: 'Hospedaje diario', description: 'Incluye paseo y comida', price: 45, duration: 1440 },
      { businessId: hotelPet.id, category: BusinessCategory.DAYCARE, name: 'Guardería medio día', description: '6 horas con juegos y paseo', price: 25, duration: 360 },
      // Walker
      { businessId: walker.id, category: BusinessCategory.WALKER, name: 'Paseo individual', description: '45 minutos, solo tu mascota', price: 20, duration: 45 },
      { businessId: walker.id, category: BusinessCategory.WALKER, name: 'Paseo grupal', description: '1 hora, max 4 perros', price: 15, duration: 60 },
      // Trainer
      { businessId: trainer.id, category: BusinessCategory.TRAINER, name: 'Clase individual', description: 'Sesión 1 a 1 de obediencia', price: 80, duration: 60 },
      { businessId: trainer.id, category: BusinessCategory.TRAINER, name: 'Pack 4 sesiones', description: 'Obediencia basica completa', price: 250, duration: 60 },
    ],
  });

  // ==================== PROMOTIONS ====================
  console.log('Creating promotions...');

  await prisma.promotion.createMany({
    data: [
      { businessId: vetCerroColorado.id, type: PromotionType.DISCOUNT_PERCENT, title: '20% OFF en vacunación', description: 'Válido por tiempo limitado. Aplica para perros y gatos.', discount: 20, startDate: daysFromNow(-5), endDate: daysFromNow(25) },
      { businessId: groomingPaws.id, type: PromotionType.BUNDLE, title: 'Baño + corte de uñas GRATIS', description: 'Lleva a tu mascota al baño y el corte de uñas es gratis.', startDate: daysFromNow(-5), endDate: daysFromNow(40) },
      { businessId: hotelPet.id, type: PromotionType.DISCOUNT_PERCENT, title: '15% OFF primera noche', description: 'Para clientes nuevos', discount: 15, startDate: daysFromNow(-5), endDate: daysFromNow(60) },
      { businessId: storePetShop.id, type: PromotionType.DISCOUNT_PERCENT, title: '10% en alimento Royal Canin', description: 'Todas las presentaciones', discount: 10, startDate: daysFromNow(-5), endDate: daysFromNow(25) },
    ],
  });

  // ==================== ROUTES ====================
  console.log('Creating routes...');

  const routes = await Promise.all([
    prisma.route.create({
      data: {
        creatorId: maria.id,
        name: 'Ruta Centro Histórico',
        description: 'Paseo por el centro histórico de Arequipa. Desde la Plaza de Armas hasta el Parque Selva Alegre, pasando por calles coloniales y plazuelas. Ruta arbolada con sombra.',
        startLat: -16.3988, startLng: -71.5370, endLat: -16.3955, endLng: -71.5340,
        waypoints: [{ lat: -16.3988, lng: -71.5370 }, { lat: -16.3975, lng: -71.5360 }, { lat: -16.3965, lng: -71.5350 }, { lat: -16.3955, lng: -71.5340 }],
        distance: 2.1, duration: 35, difficulty: RouteDifficulty.EASY,
        city: 'Arequipa', district: 'Cercado',
        hasShade: true, hasWater: true, hasRestArea: true, timesWalked: 342, avgRating: 4.6,
      },
    }),
    prisma.route.create({
      data: {
        creatorId: carlos.id,
        name: 'Circuito Parque Selva Alegre',
        description: 'Circuito completo dentro del parque Selva Alegre. Zona arbolada, con sombra, bancas para descansar y piletas de agua. Perfecto para mascotas tranquilas. Piso de tierra y grass.',
        startLat: -16.3950, startLng: -71.5345, endLat: -16.3950, endLng: -71.5345,
        waypoints: [{ lat: -16.3950, lng: -71.5345 }, { lat: -16.3945, lng: -71.5350 }, { lat: -16.3940, lng: -71.5345 }, { lat: -16.3945, lng: -71.5340 }],
        distance: 1.4, duration: 25, difficulty: RouteDifficulty.EASY,
        city: 'Arequipa', district: 'Cercado',
        hasShade: true, hasWater: true, hasRestArea: true, timesWalked: 567, avgRating: 4.8,
      },
    }),
    prisma.route.create({
      data: {
        creatorId: carlos.id,
        name: 'Mirador de Yanahuara - Carmen Alto',
        description: 'Ruta panoramica desde el mirador de Yanahuara hasta Carmen Alto. Vistas espectaculares del Misti y la campina arequipena. Subida moderada, poco sombra. Llevar agua.',
        startLat: -16.3920, startLng: -71.5500, endLat: -16.3900, endLng: -71.5600,
        waypoints: [{ lat: -16.3920, lng: -71.5500 }, { lat: -16.3915, lng: -71.5530 }, { lat: -16.3910, lng: -71.5560 }, { lat: -16.3900, lng: -71.5600 }],
        distance: 3.8, duration: 55, difficulty: RouteDifficulty.MODERATE,
        city: 'Arequipa', district: 'Yanahuara',
        hasShade: false, hasWater: false, hasRestArea: true, timesWalked: 128, avgRating: 4.4,
      },
    }),
    prisma.route.create({
      data: {
        creatorId: andres.id,
        name: 'Circuito Parque El Lago - Sachaca',
        description: 'Ruta alrededor del parque El Lago en Sachaca. Zona verde, amplia, ideal para mascotas energeticas que necesitan correr. Area cercada, segura para soltar.',
        startLat: -16.4160, startLng: -71.5700, endLat: -16.4160, endLng: -71.5700,
        waypoints: [{ lat: -16.4160, lng: -71.5700 }, { lat: -16.4170, lng: -71.5710 }, { lat: -16.4180, lng: -71.5700 }, { lat: -16.4170, lng: -71.5690 }],
        distance: 5.2, duration: 70, difficulty: RouteDifficulty.HARD,
        city: 'Arequipa', district: 'Sachaca',
        hasShade: true, hasWater: true, hasRestArea: true, timesWalked: 89, avgRating: 4.5,
      },
    }),
    prisma.route.create({
      data: {
        creatorId: sofia.id,
        name: 'Alameda Pardo - Vallecito',
        description: 'Ruta plana por la Alameda Pardo hasta el parque de Vallecito. Vereda amplia, arbolada, con bancas. Ideal para paseos tranquilos con perros senior o razas pequeñas.',
        startLat: -16.4010, startLng: -71.5350, endLat: -16.4060, endLng: -71.5280,
        waypoints: [{ lat: -16.4010, lng: -71.5350 }, { lat: -16.4030, lng: -71.5320 }, { lat: -16.4060, lng: -71.5280 }],
        distance: 1.8, duration: 30, difficulty: RouteDifficulty.EASY,
        city: 'Arequipa', district: 'Cercado',
        hasShade: true, hasWater: false, hasRestArea: true, timesWalked: 215, avgRating: 4.3,
      },
    }),
  ]);

  // ==================== EVENTS ====================
  console.log('Creating events...');

  const events = await Promise.all([
    prisma.event.create({
      data: {
        organizerId: camila.id,
        title: 'Caminata Canina por el Centro Histórico',
        description: 'Caminata grupal con nuestras mascotas por las calles del centro histórico de Arequipa. Recorreremos la Plaza de Armas, la Catedral y el Barrio de San Lazaro. Fotos grupales al final.',
        date: daysFromNow(12, '08:00'),
        endDate: daysFromNow(12, '10:30'),
        meetingPoint: 'Plaza de Armas, frente a la Catedral', meetingLat: -16.3988, meetingLng: -71.5370,
        city: 'Arequipa', district: 'Cercado',
        maxAttendees: 30, price: 0, isFree: true,
        energyLevel: EnergyLevel.MEDIUM,
        recommendedSize: [PetSize.SMALL, PetSize.MEDIUM, PetSize.LARGE],
        requirements: ['Correa obligatoria', 'Bolsas para recoger', 'Mascota sociable'],
        eventStatus: EventStatus.UPCOMING,
        routeId: routes[0].id,
      },
    }),
    prisma.event.create({
      data: {
        organizerId: camila.id,
        title: 'Mascotatron Arequipa 2026',
        description: 'La carrera de mascotas más divertida de Arequipa. Categorias por tamano. Premios para los 3 primeros de cada categoría. Hidratacion, snacks y certificado para todos los participantes.',
        date: daysFromNow(27, '09:00'),
        endDate: daysFromNow(27, '13:00'),
        meetingPoint: 'Parque Selva Alegre, entrada principal', meetingLat: -16.3950, meetingLng: -71.5345,
        city: 'Arequipa', district: 'Cercado',
        maxAttendees: 80, price: 15, isFree: false,
        energyLevel: EnergyLevel.HIGH,
        recommendedSize: [PetSize.SMALL, PetSize.MEDIUM, PetSize.LARGE, PetSize.GIANT],
        requirements: ['Vacunas al día', 'Correa o arnes', 'Certificado de salud'],
        eventStatus: EventStatus.UPCOMING,
      },
    }),
    prisma.event.create({
      data: {
        organizerId: camila.id,
        businessId: vetCerroColorado.id,
        title: 'Campaña de Vacunación Gratuita',
        description: 'Campaña de vacunación antirrabica gratuita para perros y gatos. Organizada por Veterinaria El Arca de Noe en coordinacion con la Municipalidad de Cerro Colorado.',
        date: daysFromNow(16, '09:00'),
        endDate: daysFromNow(16, '15:00'),
        meetingPoint: 'Veterinaria El Arca de Noe, Av. Ejército 1205', meetingLat: -16.3876, meetingLng: -71.5707,
        city: 'Arequipa', district: 'Cerro Colorado',
        maxAttendees: 100, price: 0, isFree: true,
        energyLevel: EnergyLevel.LOW,
        recommendedSize: [PetSize.MINI, PetSize.SMALL, PetSize.MEDIUM, PetSize.LARGE, PetSize.GIANT],
        requirements: ['Mascota con correa o transportadora'],
        eventStatus: EventStatus.UPCOMING,
      },
    }),
    prisma.event.create({
      data: {
        organizerId: pedro.id,
        title: 'Paseo Amanecer en el Misti',
        description: 'Paseo grupal al amanecer por la ruta del mirador de Yanahuara con vista al Misti. Nivel moderado. Llevar agua para ti y tu mascota. Fotos panoramicas increíbles.',
        date: daysFromNow(20, '05:30'),
        endDate: daysFromNow(20, '08:00'),
        meetingPoint: 'Mirador de Yanahuara', meetingLat: -16.3920, meetingLng: -71.5500,
        city: 'Arequipa', district: 'Yanahuara',
        maxAttendees: 20, price: 5, isFree: false,
        energyLevel: EnergyLevel.HIGH,
        recommendedSize: [PetSize.MEDIUM, PetSize.LARGE, PetSize.GIANT],
        requirements: ['Perro con buena condicion fisica', 'Agua', 'Linterna'],
        eventStatus: EventStatus.UPCOMING,
        routeId: routes[2].id,
      },
    }),
    prisma.event.create({
      data: {
        organizerId: camila.id,
        businessId: shelter1.id,
        title: 'Feria de Adopción - Patitas Sin Hogar',
        description: 'Feria de adopción responsable. Conoce a los perritos y gatitos que buscan hogar. Todos esterilizados, vacunados y desparasitados. Trae tu DNI y mucho amor.',
        date: daysFromNow(9, '10:00'),
        endDate: daysFromNow(9, '16:00'),
        meetingPoint: 'Mall Aventura Arequipa, explanada', meetingLat: -16.4320, meetingLng: -71.5090,
        city: 'Arequipa', district: 'Paucarpata',
        maxAttendees: 200, price: 0, isFree: true,
        energyLevel: EnergyLevel.LOW,
        recommendedSize: [],
        requirements: ['DNI', 'Mayor de edad'],
        eventStatus: EventStatus.UPCOMING,
      },
    }),
    prisma.event.create({
      data: {
        organizerId: pedro.id,
        businessId: trainer.id,
        title: 'Taller de Socializacion Canina',
        description: 'Taller grupal de socializacion para cachorros y perros adultos. Aprende como tu perro puede interactuar de forma segura con otros perros. Dirigido por entrenador certificado.',
        date: daysFromNow(33, '16:00'),
        endDate: daysFromNow(33, '18:00'),
        meetingPoint: 'Parque Selva Alegre, area de grass', meetingLat: -16.3950, meetingLng: -71.5345,
        city: 'Arequipa', district: 'Cercado',
        maxAttendees: 15, price: 25, isFree: false,
        energyLevel: EnergyLevel.MEDIUM,
        recommendedSize: [PetSize.SMALL, PetSize.MEDIUM, PetSize.LARGE],
        requirements: ['Vacunas al día', 'Correa corta', 'Premios/treats'],
        eventStatus: EventStatus.UPCOMING,
      },
    }),
  ]);

  // ==================== EVENT ATTENDANCES ====================
  console.log('Creating attendances...');

  await prisma.eventAttendance.createMany({
    data: [
      { eventId: events[0].id, userId: maria.id, petId: luna.id },
      { eventId: events[0].id, userId: carlos.id, petId: rocky.id },
      { eventId: events[0].id, userId: andres.id, petId: max.id },
      { eventId: events[0].id, userId: sofia.id, petId: canela.id },
      { eventId: events[0].id, userId: valentina.id, petId: nala.id },
      { eventId: events[1].id, userId: maria.id, petId: luna.id },
      { eventId: events[1].id, userId: carlos.id, petId: rocky.id },
      { eventId: events[1].id, userId: pedro.id, petId: thor.id },
      { eventId: events[1].id, userId: andres.id, petId: max.id },
      { eventId: events[2].id, userId: lucia.id, petId: pelusa.id },
      { eventId: events[2].id, userId: jose.id, petId: toby.id },
      { eventId: events[3].id, userId: carlos.id, petId: rocky.id },
      { eventId: events[3].id, userId: pedro.id, petId: thor.id },
      { eventId: events[4].id, userId: valentina.id, petId: nala.id },
      { eventId: events[5].id, userId: sofia.id, petId: canela.id },
      { eventId: events[5].id, userId: diego.id, petId: rex.id },
    ],
  });

  // ==================== REVIEWS ====================
  console.log('Creating reviews...');

  await prisma.review.createMany({
    data: [
      { userId: maria.id, businessId: vetCerroColorado.id, rating: 5, comment: 'Excelente veterinaria, muy profesionales. Mi Luna siempre sale contenta de ahi.' },
      { userId: carlos.id, businessId: vetCerroColorado.id, rating: 4, comment: 'Buena atención, precios justos. A veces hay que esperar un poco.' },
      { userId: lucia.id, businessId: vetCerroColorado.id, rating: 5, comment: 'Atienden muy bien a mi conejito. Pocos veterinarios saben de conejos.' },
      { userId: andres.id, businessId: vetCayma.id, rating: 5, comment: 'Operaron a mi Max y salio todo perfecto. El doctor es muy bueno.' },
      { userId: sofia.id, businessId: vetCayma.id, rating: 4, comment: 'Buena clínica, moderna. Los precios son un poco más altos que otros.' },
      { userId: valentina.id, businessId: vetYanahuara.id, rating: 5, comment: 'La dermatologa es excelente. Mi Nala tenia problemas de piel y ya mejoro.' },
      { userId: maria.id, businessId: groomingPaws.id, rating: 5, comment: 'Luna queda hermosa cada vez que la llevo. El spa es increible.' },
      { userId: sofia.id, businessId: groomingPaws.id, rating: 5, comment: 'Canela siempre sale oliendo delicioso. Muy recomendado.' },
      { userId: lucia.id, businessId: groomingPaws.id, rating: 4, comment: 'Buen servicio, aunque a veces no tienen cita disponible rápido.' },
      { userId: pedro.id, businessId: hotelPet.id, rating: 5, comment: 'Deje a Thor 5 días y estaba feliz cuando lo recogi. Las camaras en vivo son un plus.' },
      { userId: andres.id, businessId: hotelPet.id, rating: 4, comment: 'Buenas instalaciones, Max se divirtio mucho. Solo falta más area techada.' },
      { userId: maria.id, businessId: storePetShop.id, rating: 5, comment: 'Tienen todo lo que necesito. La variedad de alimentos es enorme.' },
      { userId: carlos.id, businessId: trainer.id, rating: 5, comment: 'Rocky mejoro muchisimo su obediencia. El entrenador tiene mucha paciencia.' },
      { userId: sofia.id, businessId: walker.id, rating: 5, comment: 'Canela ama sus paseos. Me mandan fotos y el GPS del recorrido.' },
      // Route reviews
      { userId: maria.id, routeId: routes[0].id, rating: 5, comment: 'Hermosa ruta, mucha sombra y calles bonitas. Luna disfruto mucho.' },
      { userId: carlos.id, routeId: routes[1].id, rating: 5, comment: 'El parque favorito de Rocky. Mucho espacio para correr.' },
      { userId: andres.id, routeId: routes[1].id, rating: 5, comment: 'Perfecto para pasear. Hay agua y bancas para descansar.' },
      { userId: pedro.id, routeId: routes[2].id, rating: 4, comment: 'Vistas increíbles pero la subida es fuerte. Thor la disfruto.' },
      { userId: sofia.id, routeId: routes[3].id, rating: 5, comment: 'Ideal para que Canela corra libre. Area segura y cercada.' },
      { userId: valentina.id, routeId: routes[4].id, rating: 4, comment: 'Ruta tranquila y plana, ideal para Nala. Falta agua en el camino.' },
    ],
  });

  // ==================== FAVORITES ====================
  console.log('Creating favorites...');

  await prisma.favorite.createMany({
    data: [
      { userId: maria.id, businessId: vetCerroColorado.id },
      { userId: maria.id, businessId: groomingPaws.id },
      { userId: carlos.id, businessId: vetYanahuara.id },
      { userId: lucia.id, businessId: vetCerroColorado.id },
      { userId: andres.id, businessId: vetCayma.id },
      { userId: sofia.id, businessId: groomingPaws.id },
      { userId: sofia.id, businessId: walker.id },
      { userId: maria.id, routeId: routes[0].id },
      { userId: carlos.id, routeId: routes[1].id },
      { userId: andres.id, routeId: routes[3].id },
      { userId: maria.id, eventId: events[0].id },
      { userId: carlos.id, eventId: events[1].id },
    ],
  });

  console.log('Seed completed successfully!');
  console.log(`Created: ${users.length + 1} users, ${pets.length} pets, ${allBusinesses.length} businesses, ${routes.length} routes, ${events.length} events`);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
