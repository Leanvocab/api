import express from 'express';
import wordModel from './model';

const router = express.Router();

// GET /word/123
router.get('/:wordId', async (req, res) => {
  const id = req.params.wordId;
  try {
    const result = await wordModel.findById(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET /word/all/123
router.get('/all/:userId', async (req, res) => {
  try {
    const result = await wordModel.find({userId: req.params.userId});
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST /word
router.post('/', async (req, res) => {
  try {
    const result = await wordModel.create(req.body);
    result.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT /word/123
router.put('/:wordId', async (req, res) => {
  try {
    const result = await wordModel.findByIdAndUpdate(req.params.wordId, req.body, {new: true});
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE /word/123
router.delete('/:wordId', async (req, res) => {
  try {
    const result = await wordModel.findByIdAndDelete(req.params.wordId);
    res.status(200).send('Delete succeed');
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;