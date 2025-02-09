import express from 'express';
import counterRoutes from './src/counter/counter-routes';
import slotRoutes from './src/driver-planning/slot-routes';
import driverPlanningRoutes from './src/driver-planning/driver-planning-routes';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Routes
app.use(counterRoutes);
app.use(slotRoutes);
app.use(driverPlanningRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});