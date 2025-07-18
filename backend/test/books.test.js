const request = require('supertest');
const app = require('../server');

describe('Book Catalog API', () => {
  describe('GET /api/books', () => {
    it('should get all books', async () => {
      const response = await request(app)
        .get('/api/books')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.total).toBeGreaterThan(0);
    });
  });

  describe('GET /api/books/:id', () => {
    it('should get a book by ID', async () => {
      const response = await request(app)
        .get('/api/books/1')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id', '1');
    });

    it('should return 404 for non-existent book', async () => {
      const response = await request(app)
        .get('/api/books/999')
        .expect(404);
      
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Book not found');
    });
  });

  describe('POST /api/books', () => {
    it('should create a new book', async () => {
      const newBook = {
        title: 'Test Book',
        author: 'Test Author',
        genre: 'Test Genre',
        publicationYear: 2023,
        availability: true
      };

      const response = await request(app)
        .post('/api/books')
        .send(newBook)
        .expect(201);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('title', 'Test Book');
      expect(response.body.data).toHaveProperty('id');
    });

    it('should return 400 for invalid book data', async () => {
      const invalidBook = {
        title: '',
        author: 'Test Author'
      };

      const response = await request(app)
        .post('/api/books')
        .send(invalidBook)
        .expect(400);
      
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Validation failed');
    });
  });

  describe('GET /api/books/search', () => {
    it('should search books by title', async () => {
      const response = await request(app)
        .get('/api/books/search?q=1984&type=title')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].title).toBe('1984');
    });

    it('should return 400 for empty search query', async () => {
      const response = await request(app)
        .get('/api/books/search?q=')
        .expect(400);
      
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Search query is required');
    });
  });
});