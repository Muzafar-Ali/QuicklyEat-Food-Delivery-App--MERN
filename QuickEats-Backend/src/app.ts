import express from 'express';
import config from './config/config.js';
import { connectDB } from './utils/connectDB.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// route imports
import userRoutes from './routes/user.routes.js';
import restaurantRoutes from './routes/restaurant.routes.js';

const app = express();
const port = config.port;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// health check route
app.get('/api/v1/health', (req, res) => {
  res.send('QuickEats responds OK!');
});

// routes
app.use('/api/v1', userRoutes);
app.use('/api/v1', restaurantRoutes);

// Error middleware 
app.use(errorMiddleware)

app.listen(port, () => {
  connectDB();
  console.log(`app listening at http://localhost:${port}`);
});