const books = require('../data/bookData');
const Book = require('../models/Book');

class BookService {
  static getAllBooks() {
    return books;
  }

  static getBookById(id) {
    return books.find(book => book.id === id);
  }

  static createBook(bookData) {
    // Check for duplicate title by same author
    const existingBook = books.find(book => 
      book.title.toLowerCase() === bookData.title.toLowerCase() && 
      book.author.toLowerCase() === bookData.author.toLowerCase()
    );
    
    if (existingBook) {
      throw new Error('A book with this title and author already exists');
    }
    
    const newBook = new Book(
      bookData.title,
      bookData.author,
      bookData.genre,
      bookData.publicationYear,
      bookData.availability
    );
    
    books.push(newBook);
    return newBook;
  }

  static updateBook(id, updateData) {
    const bookIndex = books.findIndex(book => book.id === id);
    
    if (bookIndex === -1) {
      throw new Error('Book not found');
    }
    
    // Check for duplicate title by same author (excluding current book)
    const existingBook = books.find(book => 
      book.id !== id &&
      book.title.toLowerCase() === updateData.title.toLowerCase() && 
      book.author.toLowerCase() === updateData.author.toLowerCase()
    );
    
    if (existingBook) {
      throw new Error('A book with this title and author already exists');
    }
    
    const book = books[bookIndex];
    book.update(updateData);
    
    return book;
  }

  static deleteBook(id) {
    const bookIndex = books.findIndex(book => book.id === id);
    
    if (bookIndex === -1) {
      throw new Error('Book not found');
    }
    
    return books.splice(bookIndex, 1)[0];
  }

  static searchBooks(searchTerm, type = 'all') {
    const term = searchTerm.toLowerCase().trim();
    
    switch (type) {
      case 'title':
        return books.filter(book => 
          book.title.toLowerCase().includes(term)
        );
      case 'author':
        return books.filter(book => 
          book.author.toLowerCase().includes(term)
        );
      case 'genre':
        return books.filter(book => 
          book.genre.toLowerCase().includes(term)
        );
      default:
        return books.filter(book => 
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term) ||
          book.genre.toLowerCase().includes(term)
        );
    }
  }

  static getBooksByAvailability(isAvailable) {
    return books.filter(book => book.availability === isAvailable);
  }

  static getStats() {
    const totalBooks = books.length;
    const availableBooks = books.filter(book => book.availability).length;
    const unavailableBooks = totalBooks - availableBooks;
    
    const genreStats = books.reduce((acc, book) => {
      acc[book.genre] = (acc[book.genre] || 0) + 1;
      return acc;
    }, {});
    
    const authorStats = books.reduce((acc, book) => {
      acc[book.author] = (acc[book.author] || 0) + 1;
      return acc;
    }, {});

    return {
      totalBooks,
      availableBooks,
      unavailableBooks,
      genreDistribution: genreStats,
      authorDistribution: authorStats
    };
  }
}

module.exports = BookService;