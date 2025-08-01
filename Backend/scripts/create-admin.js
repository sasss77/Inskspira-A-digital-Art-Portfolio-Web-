import bcrypt from 'bcryptjs';
import { User, sequelize } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established.');

    await sequelize.sync();
    console.log('✅ Database synchronized.');

    const existingAdmin = await User.findOne({
      where: { email: 'admin@gmail.com' }
    });

    if (existingAdmin) {
      console.log('⚠️ Admin user already exists!');
      process.exit(0);
    }

    const admin = await User.create({
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'admin123',
      role: 'admin',
      isActive: true,
      bio: 'System Administrator'
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@gmail.com');
    console.log('🔑 Password: admin123');
    console.log('🔗 Login URL: http://localhost:3000/login');
    console.log('🛡️ Admin Panel: http://localhost:3000/admin');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
};

createAdmin();