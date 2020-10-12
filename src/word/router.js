import express from 'express';
import wordModel from './model';

import isAuthenticated from '../middlewares/isAuthenticated';

const router = express.Router();

// GET /word/all
router.get('/all', isAuthenticated, async (req, res) => {
  try {
    const result = await wordModel.find({userId: req.user_id});
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET /word/123
router.get('/:wordId', isAuthenticated, async (req, res) => {
  const id = req.params.wordId;
  try {
    const result = await wordModel.findById(id);
    if (result.userId !== req.user_id) {
      res.status(403).send('UserId mismatch.');
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST /word
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const word = {...req.body, userId: req.user_id};
    const result = await wordModel.create(word);
    result.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT /word/123
router.put('/:wordId', isAuthenticated, async (req, res) => {
  try {
    // TODO: extra check if word belogs to user
    const result = await wordModel.findByIdAndUpdate(req.params.wordId, req.body, {new: true});
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE /word/123
router.delete('/:wordId', isAuthenticated, async (req, res) => {
  try {
    // TODO: extra check if word belogs to user
    const result = await wordModel.findByIdAndDelete(req.params.wordId);
    if (result.userId !== req.user_id) {
      res.status(403).send('UserId mismatch.');
    }
    res.status(200).send('Delete succeed');
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;