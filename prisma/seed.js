const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Iniciando el seeder...');

  // Cifrar contraseñas
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const clientPasswordHash = await bcrypt.hash('cliente123', 10);

  // Crear o actualizar usuario admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lemarj.com' },
    update: {},
    create: {
      email: 'admin@lemarj.com',
      password_hash: adminPasswordHash,
      role: 'admin',
    },
  });
  console.log('Admin creado/verificado:', admin.email);

  // Crear o actualizar usuario cliente
  const cliente = await prisma.user.upsert({
    where: { email: 'cliente@lemarj.com' },
    update: {},
    create: {
      email: 'cliente@lemarj.com',
      password_hash: clientPasswordHash,
      role: 'cliente',
    },
  });
  console.log('Cliente creado/verificado:', cliente.email);

  // Crear workspace para el cliente
  // Verificamos primero si ya tiene uno para no duplicar en cada ejecución
  const existingWorkspace = await prisma.workspace.findFirst({
    where: { owner_id: cliente.id }
  });

  if (!existingWorkspace) {
    const workspace = await prisma.workspace.create({
      data: {
        name: 'Mi Primer Workspace (Cliente)',
        owner_id: cliente.id,
      },
    });
    console.log('Workspace creado para el cliente:', workspace.name);
  } else {
    console.log('El cliente ya tiene un workspace asignado.');
  }

  console.log('¡Seeder completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('Error durante la ejecución del seeder:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
