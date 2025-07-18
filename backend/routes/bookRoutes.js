const express = require('express');
const BookController = require('../controllers/bookController');

const router = express.Router();

// Main CRUD routes
router.get('/', BookController.getAllBooks);
router.get('/search', BookController.searchBooks);
router.get('/available', BookController.getAvailableBooks);
router.get('/unavailable', BookController.getUnavailableBooks);
router.get('/stats', BookController.getStats);
router.get('/:id', BookController.getBookById);
router.post('/', BookController.createBook);
router.put('/:id', BookController.updateBook);
router.patch('/:id/availability', BookController.updateAvailability);
router.delete('/:id', BookController.deleteBook);

module.exports = router;