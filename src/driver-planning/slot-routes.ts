import express, { Request, Response, NextFunction } from 'express';
import * as slotService from './slot-service';
import { Slot } from '../types/db';

const router = express.Router();

const checkResourceExists = (req: Request, res: Response, next: NextFunction) => {
  const { slotId } = req.params;
  if (slotId && !slotService.getSlot(slotId)) {
    return res.status(404).json({
      error: 'Slot not found',
      message: `The requested slot with ID ${slotId} does not exist.`,
    });
  }
  next();
};

router.get('/slots/:slotId', checkResourceExists, (req, res) => {
  const { slotId } = req.params;
  const slotData = slotService.getSlot(slotId) as Slot;
  const currentDriverId = 'tamas1'; //from a cookie or from a more secure principal?
  const htmxRes = slotService.createSlotHtml(slotData, currentDriverId);
  res.send(htmxRes);
});

router.post('/slots/:slotId/drivers/:driverId', checkResourceExists, (req, res) => {
  const { slotId, driverId } = req.params;
  const slotData = slotService.addDriver(slotId, driverId);
  const currentDriverId = 'tamas1';
  const htmxRes = slotService.createSlotHtml(slotData, currentDriverId);
  res.send(htmxRes);
});

router.delete('/slots/:slotId/drivers/:driverId', checkResourceExists, (req, res) => {
  const { slotId, driverId } = req.params;
  const slotData = slotService.removeDriver(slotId, driverId);
  const currentDriverId = 'tamas1';
  const htmxRes = slotService.createSlotHtml(slotData, currentDriverId);
  res.send(htmxRes);
});

router.get('slots/:slotId/abmeldenTel', checkResourceExists, (req, res) => {
  const { slotId } = req.params;
  const slotData = slotService.getSlot(slotId) as Slot;
  const currentDriverId = 'tamas1';
  const htmxRes = slotService.createAbmeldenHtml(slotData, currentDriverId);
  res.send(htmxRes);
});

export default router;