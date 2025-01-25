import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import adminRoutes from './routes/adminRoutes';
import logger from './utils/logger';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  logger.info(`User Backend running on port ${PORT}`);
});
