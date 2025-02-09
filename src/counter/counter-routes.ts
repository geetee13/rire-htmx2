import express from 'express';
import * as counterService from './counter-service';

const router = express.Router();

router.get('/counter', (req, res) => {
  const count = counterService.getCounter();
  res.send(`<span id="counter">${count}</span>`);
});

router.post('/increment', (req, res) => {
  const count = counterService.increment();
  res.send(`<span id="counter">${count}</span>`);
});

router.post('/decrement', (req, res) => {
  const count = counterService.decrement();
  res.send(`<span id="counter">${count}</span>`);
});

export default router;