const { v4: uuidv4 } = require('uuid');

class Book {
  constructor(title, author, genre, publicationYear, availability = true) {
    this.id = uuidv4();
    this.title = title.trim();
    this.author = author.trim();
    this.genre = genre.trim();
    this.publicationYear = publicationYear;
    this.availability = availability;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  static validate(bookData) {
    const errors = [];
    
    if (!bookData.title || typeof bookData.title !== 'string' || bookData.title.trim().length === 0) {
      errors.push('Title is required and must be a non-empty string');
    }
    
    if (!bookData.author || typeof bookData.author !== 'string' || bookData.author.trim().length === 0) {
      errors.push('Author is required and must be a non-empty string');
    }
    
    if (!bookData.genre || typeof bookData.genre !== 'string' || bookData.genre.trim().length === 0) {
      errors.push('Genre is required and must be a non-empty string');
    }
    
    if (!bookData.publicationYear || !Number.isInteger(bookData.publicationYear) || bookData.publicationYear < 0) {
      errors.push('Publication year is required and must be a positive integer');
    }
    
    if (bookData.availability !== undefined && typeof bookData.availability !== 'boolean') {
      errors.push('Availability must be a boolean value');
    }
    
    return errors;
  }

  update(updateData) {
    if (updateData.title) this.title = updateData.title.trim();
    if (updateData.author) this.author = updateData.author.trim();
    if (updateData.genre) this.genre = updateData.genre.trim();
    if (updateData.publicationYear) this.publicationYear = updateData.publicationYear;
    if (updateData.availability !== undefined) this.availability = updateData.availability;
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = Book;