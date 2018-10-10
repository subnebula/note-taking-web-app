const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

// Index
router.get('/', (req, res) => {
  models.Notebook.findAll({ order: [['createdAt', 'DESC']] })
    .then(notebooks => res.json(notebooks))
    .catch(err => res.status(500).json({ error: err.message }));
});

/* *** TODO: Fill in the API endpoints for notebooks *** */

<<<<<<< HEAD
// GET /notebooks/:notebookID/notes
router.get('/:notebookId/notes', (req, res) => {
  models.Note.findAll({ where: {notebookId: req.params.notebookId } })
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ error: err.message }));
});

// POST /notebooks
router.post('/', (req, res) => {
  models.Notebook.create(req.body)
    .then(notebook => res.json(notebook))
    .catch(err => res.status(422).json({ error: err.message }));
});

// GET /notebooks/:notebookId
router.get('/:notebookId', (req, res) => {
  models.Notebook.findById(req.params.notebookId)
    .then(notebook => res.json(notebook))
    .catch(err => res.status(500).json({ error: err.message }));
});

// DELETE /notebooks/:notebookId
=======
// Get /notebooks/:notebookID/notes
/*router.get('/:notebookId/notes', (req, res) => {
  models.Notebook.findById(req.params.notebookId)
    .then(models.Notes.findAll({ order: [['createdAt', 'DESC']] })update)
    .then(notebooks => res.json(notebooks))
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ error: err.message }));
});*/

// Post /notebooks
router.post('/', (req, res) => {
  models.Notebook.create(req.body)
    .then(notebooks => res.json(notebooks))
    .catch(err => res.status(422).json({ error: err.message }));
});

// Get /notebooks/:notebookId
router.get('/:notebookId', (req, res) => {
  models.Notebook.findById(req.params.notebookId)
    .then(notebooks => res.json(notebooks))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Delete /notebooks/:notebookId
>>>>>>> 9229faf04110e5c3b8265d8783e7319b09e408cc
router.delete('/:notebookId', (req, res) => {
  models.Notebook.destroy({ where: { id: req.params.notebookId } })
    .then(() => res.json({}))
    .catch(err => res.status(500).json({ error: err.message }));
});


<<<<<<< HEAD
// PUT /notebooks/:notebookID
router.put('/:notebookId', (req, res) => {
  models.Notebook.update(
    { title: req.body.title },
    { where: { id: req.params.notebookId } })
    .catch(err => res.status(500).json({ error: err.message }));
  models.Notebook.findById(req.params.notebookId)
    .then(notebook => res.json(notebook))
    .catch(err => res.status(500).json({ error: err.message }));
});

=======
// Put /notebooks/:notebookID
router.put('/:notebookId', (req, res) => {
  models.Notebook.update(
    { title: req.body },
    { where: { id: req.params.notebookId } })
    .then(notebooks => res.json(notebooks))
    .catch(err => res.status(500).json({ error: err.message }));
});


>>>>>>> 9229faf04110e5c3b8265d8783e7319b09e408cc
module.exports = router;
