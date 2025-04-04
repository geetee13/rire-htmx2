import express, { NextFunction } from 'express';
import counterRoutes from './src/counter/counter-routes';
import dpSlotRoutes from './src/driver-planning/slot-routes';
import driverPlanningRoutes from './src/driver-planning/driver-planning-routes';
import pflegeDashboardRoutes from './src/pflege-dashboard/pflege-dashboard-routes';
import authRoutes from './src/auth/auth-routes';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

const delayMiddleware = (ms: number) => (req: Request, res: Response, next: NextFunction) => setTimeout(next, ms);

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());
//app.use(delayMiddleware(3000));

// Routes
app.use(counterRoutes);
app.use(dpSlotRoutes);
app.use(driverPlanningRoutes);
app.use(pflegeDashboardRoutes);
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});