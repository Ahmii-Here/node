const express = require('express');
const router = express.Router();
const errorHandler = require('../helper/errorHandler');
const bookController = require('../controller/books');

// Create a new book
router.post('/create', errorHandler(bookController.create));

// Get all books
router.get('/', errorHandler(bookController.getAll));

// Get a book by ID
router.get('/:id', errorHandler(bookController.getById));

// Get a book by slug
router.get('/slug/:slug', errorHandler(bookController.getBySlug));

// Update a book by ID
router.put('/:id', errorHandler(bookController.update));

// Delete a book by ID
router.delete('/:id', errorHandler(bookController.delete));


module.exports = router;
