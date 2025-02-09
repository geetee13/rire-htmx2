import express from 'express';
import * as driverPlanningService from './driver-planning-service';

const router = express.Router();

router.get('/driver-planning', (req, res) => {
  const html = driverPlanningService.createDriverPlanningHtml();
  res.send(html);
});

export default router;