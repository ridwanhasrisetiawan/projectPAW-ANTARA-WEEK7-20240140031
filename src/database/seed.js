const db = require('../config/database');
const User = require('../models/user.model');

const demoUsers = [
  { name: 'Admin User', email: 'admin@example.com', password: '12345678' },
  { name: 'Rizki', email: 'rizki@example.com', password: '12345678' },
];

console.log('Seeding data user demo...');

demoUsers.forEach((u) => {
  const existing = User.findByEmail(u.email);
  if (existing) {
    console.log(`- ${u.email} sudah ada, dilewati`);
    return;
  }
  User.create(u);
  console.log(`- ${u.email} berhasil dibuat`);
});

console.log('Seeding selesai.');
db.close();
