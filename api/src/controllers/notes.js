const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

/* *** TODO: Fill in the API endpoints for notes *** */

// GET /notes
router.get('/', (req, res) => {
  models.Note.findAll({ order: [['createdAt', 'DESC']] })
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ error: err.message }));
});

// POST /notes
router.post('/', (req, res) => {
  models.Note.create(req.body)
    .then(note => res.json(note))
    .catch(err => res.status(422).json({ error: err.message }));
});

// GET /notes/:noteId
router.get('/:noteId', (req, res) => {
  models.Note.findById(req.params.noteId)
    .then(note => res.json(note))
    .catch(err => res.status(500).json({ error: err.message }));
});

// DELETE /notes/:noteId
router.delete('/:noteId', (req, res) => {
  models.Note.destroy({ where: { id: req.params.noteId } })
    .then(() => res.json({}))
    .catch(err => res.status(500).json({ error: err.message }));
});

// PUT /notes/:noteId
router.put('/:noteId', (req, res) => {
  models.Note.update(
    { title: req.body.title,
      content: req.body.content,
      notebookId: req.body.notebookId },
    { where: { id: req.params.noteId } })
    .catch(err => res.status(500).json({ error: err.message }));
  models.Note.findById(req.params.noteId)
    .then(note => res.json(note))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Use this instead
/*router.put('/:noteId', (req, res) => {
  models.Note.findById(req.params.noteId)
    .then(note => note.update(postFilter(req.body.content, req.body.notebookId)))
    .then(note => res.json(note))
    .catch(err => res.status(422).json({ error: err.message }));
});*/
module.exports = router;
