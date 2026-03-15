require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const logRoutes = require('./src/routes/logs');
const authRoutes = require('./src/routes/auth');
const protect = require('./src/middleware/auth');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/logs', protect, logRoutes);

app.get('/', (req, res) => {
  res.json({ app: 'Log Monitor', version: '1.0.0', status: 'running' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Log Monitor running on http://localhost:${PORT}`);
});