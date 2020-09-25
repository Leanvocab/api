import express from 'express';
const router = express.Router();

// GET /word/123
router.get('/:wordId', (req, res) => {
  res.send(`word get ${req.params.wordId}`);
});

// GET /word/all/123
router.get('/all/:userId', (req, res) => {
  res.send(`user get all from user ${req.params.userId}`);
});

// POST /word
router.post('/', (req, res) => res.send(req.body));

// PUT /word/123
router.put('/:wordId', (req, res) => res.send(req.body));

export default router;