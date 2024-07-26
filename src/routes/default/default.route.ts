import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Travel Management System API' });
});

export default router;
