// run with `node utils/seed.js` after setting MONGO_URI
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Scheme = require('../models/Scheme');


(async () => {
await connectDB();
await Scheme.deleteMany({});
await Scheme.insertMany([
{ title: 'Scholarship A', description: 'Desc A', eligibility: 'Students', applyLink: '#', category: 'Education' },
{ title: 'Entrepreneur Grant', description: 'For startups', eligibility: 'Startups', applyLink: '#', category: 'Business' }
]);
console.log('Seeded');
process.exit(0);
})();