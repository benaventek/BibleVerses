import { Router } from 'express';
import { getVerse, getRandomVerse, niceVerses } from '../data/verses.js';

const router = Router();

router.route('/').get(async (req, res) => {
  res.render('home', { title: 'Random Bible Verse', niceVerses: niceVerses });
});

router.route('/get-random-verse').post(async (req, res) => {
  try {
    const verse = await getRandomVerse();
    res.status(200).json(verse);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch random verse' });
  }
});

router.route('/get-verse').post(async (req, res) => {
  try {
    const verse = await getVerse(req.body.verse);
    res.status(200).json(verse);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch verse' });
  }
});

export default router;
