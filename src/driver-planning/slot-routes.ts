import express from 'express';
import * as slotService from './slot-service';

const router = express.Router();

router.get('/slots/:slotId', (req, res) => {
  const { slotId } = req.params;
  const slotData = slotService.getSlot(slotId);
  
  if (!slotData) {
    return res.status(404).json({
      error: 'Slot not found',
      message: `The requested slot with ID ${slotId} does not exist.`,
    });
  }

  const currentDriverId = 'tamas1'; //from a cookie or from a more secure principal?
  const htmxRes = slotService.createSlotHtml(slotData, currentDriverId);
  res.send(htmxRes);
});

router.post('/slots/:slotId/drivers/:driverId', (req, res) => {
  const { slotId, driverId } = req.params;
  const slotData = slotService.addDriver(slotId, driverId);
  const currentDriverId = 'tamas1';
  const htmxRes = slotService.createSlotHtml(slotData, currentDriverId);
  res.send(htmxRes);
});

router.delete('/slots/:slotId/drivers/:driverId', (req, res) => {
  const { slotId, driverId } = req.params;
  const slotData = slotService.removeDriver(slotId, driverId);
  const currentDriverId = 'tamas1';
  const htmxRes = slotService.createSlotHtml(slotData, currentDriverId);
  res.send(htmxRes);
});

export default router;