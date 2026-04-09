import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create María (fisio) account
  const hash = await bcrypt.hash('fisiocan2024', 10);
  await prisma.user.upsert({
    where: { email: 'maria@fisiocan.es' },
    update: {},
    create: {
      email: 'maria@fisiocan.es',
      password: hash,
      name: 'María Díaz',
      role: 'FISIO' as string,
    },
  });

  // Sample rehab routines
  const routines = [
    { name: 'Ejercicios de movilidad de cadera', category: 'Movilidad', description: 'Ejercicios pasivos y activos para mejorar el rango de movimiento de la articulación coxofemoral.', videoUrl: 'https://www.youtube.com/watch?v=example1', duration: 15 },
    { name: 'Hidroterapia — cinta acuática', category: 'Hidroterapia', description: 'Sesión en cinta subacuática para descarga articular y fortalecimiento muscular.', videoUrl: '', duration: 20 },
    { name: 'Propiocepción básica', category: 'Propiocepción', description: 'Ejercicios sobre superficies inestables para mejorar el equilibrio y coordinación.', videoUrl: 'https://www.youtube.com/watch?v=example2', duration: 10 },
    { name: 'Fortalecimiento tren posterior', category: 'Fortalecimiento', description: 'Serie de ejercicios para fortalecer la musculatura del tren posterior.', videoUrl: '', duration: 20 },
    { name: 'Estiramientos cadena dorsal', category: 'Flexibilidad', description: 'Estiramientos suaves de la cadena dorsal y paravertebrales.', videoUrl: 'https://www.youtube.com/watch?v=example3', duration: 10 },
  ];

  for (const r of routines) {
    await prisma.rehabRoutine.upsert({
      where: { id: routines.indexOf(r) + 1 },
      update: {},
      create: r,
    });
  }

  console.log('✅ Seed completado. Usuario: maria@fisiocan.es / fisiocan2024');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
