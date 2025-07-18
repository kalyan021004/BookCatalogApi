const BookService = require('../services/bookService');
const Book = require('../models/Book');

class BookController {
  static async getAllBooks(req, res) {
    try {
      const books = BookService.getAllBooks();
      res.json({
        success: true,
        data: books,
        total: books.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  static async getBookById(req, res) {
    try {
      const book = BookService.getBookById(req.params.id);
      
      if (!book) {
        return res.status(404).json({
          success: false,
          error: 'Book not found'
        });
      }
      
      res.json({
        success: true,
        data: book
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  static async createBook(req, res) {
    try {
      const validationErrors = Book.validate(req.body);
      
      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validationErrors
        });
      }
      
      const newBook = BookService.createBook(req.body);
      
      res.status(201).json({
        success: true,
        data: newBook,
        message: 'Book created successfully'
      });
    } catch (error) {
      if (error.message === 'A book with this title and author already exists') {
        return res.status(409).json({
          success: false,
          error: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  static async updateBook(req, res) {
    try {
      const validationErrors = Book.validate(req.body);
      
      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validationErrors
        });
      }
      
      const updatedBook = BookService.updateBook(req.params.id, req.body);
      
      res.json({
        success: true,
        data: updatedBook,
        message: 'Book updated successfully'
      });
    } catch (error) {
      if (error.message === 'Book not found') {
        return res.status(404).json({
          success: false,
          error: error.message
        });
      }
      
      if (error.message === 'A book with this title and author already exists') {
        return res.status(409).json({
          success: false,
          error: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  static async updateAvailability(req, res) {
    try {
      const { availability } = req.body;
      
      if (typeof availability !== 'boolean') {
        return res.status(400).json({
          success: false,
          error: 'Availability must be a boolean value'
        });
      }
      
      const updatedBook = BookService.updateBook(req.params.id, { availability });
      
      res.json({
        success: true,
        data: updatedBook,
        message: 'Book availability updated successfully'
      });
    } catch (error) {
      if (error.message === 'Book not found') {
        return res.status(404).json({
          success: false,
          error: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  static async deleteBook(req, res) {
    try {
      const deletedBook = BookService.deleteBook(req.params.id);
      
      res.json({
        success: true,
        data: deletedBook,
        message: 'Book deleted successfully'
      });
    } catch (error) {
      if (error.message === 'Book not found') {
        return res.status(404).json({
          success: false,
          error: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  static async searchBooks(req, res) {
    try {
      const { q, type = 'all' } = req.query;
      
      if (!q || q.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Search query is required'
        });
      }
      
      const filteredBooks = BookService.searchBooks(q, type);
      
      res.json({
        success: true,
        data: filteredBooks,
        total: filteredBooks.length,
        searchTerm: q,
        searchType: type
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  static async getAvailableBooks(req, res) {
    try {
      const availableBooks = BookService.getBooksByAvailability(true);
      
      res.json({
        success: true,
        data: availableBooks,
        total: availableBooks.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  static async getUnavailableBooks(req, res) {
    try {
      const unavailableBooks = BookService.getBooksByAvailability(false);
      
      res.json({
        success: true,
        data: unavailableBooks,
        total: unavailableBooks.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  static async getStats(req, res) {
    try {
      const stats = BookService.getStats();
      
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = BookController;