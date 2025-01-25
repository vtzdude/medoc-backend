import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import userRoutes from './routes/userRoutes';
import notesRouter from './routes/noteRoutes';
import adminRouter from './routes/adminRoutes';
import logger from './utils/logger';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/auth', userRoutes);
app.use('/notes', notesRouter);
app.use('/admin', adminRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`User Backend running on port ${PORT}`);
});
