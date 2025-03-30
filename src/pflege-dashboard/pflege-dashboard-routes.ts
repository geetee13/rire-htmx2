import express from 'express';
import * as pflegeDashboardService from './pflege-dashboard-service';

const router = express.Router();

router.get('/pflege-dashboard', (req, res) => {
  const html = pflegeDashboardService.createPflegeDashboardHtml();
  res.send(html);
});

export default router;
