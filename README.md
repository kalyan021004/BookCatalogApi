# 📚 Book Catalog API

A complete RESTful API for managing a library's book catalog with full CRUD operations, advanced search functionality, and comprehensive testing suite.

## 🚀 Features

- ✅ **Complete CRUD Operations** - Create, Read, Update, Delete books
- 🔍 **Advanced Search** - Search by title, author, genre, or all fields
- 📊 **Statistics & Analytics** - Get catalog insights and distribution data
- 🛡️ **Input Validation** - Comprehensive validation with detailed error messages
- 🚫 **Duplicate Prevention** - Prevents duplicate books (same title + author)
- 📱 **RESTful Design** - Clean, intuitive API endpoints
- 🧪 **Comprehensive Testing** - Full test coverage with Jest & Supertest
- 🔒 **Security** - Helmet for security headers, CORS enabled
- 📝 **Logging** - Morgan for request logging
- 🏗️ **Modular Architecture** - Clean separation of concerns

## 📁 Project Structure

```
book-catalog-api/
├── server.js                 # Main server file
├── package.json              # Dependencies and scripts
├── .env                      # Environment variables
├── models/
│   └── Book.js              # Book model and validation
├── controllers/
│   └── bookController.js    # Request handlers
├── services/
│   └── bookService.js       # Business logic
├── routes/
│   └── bookRoutes.js        # Route definitions
├── middleware/
│   └── errorMiddleware.js   # Error handling
├── data/
│   ├── bookData.js         # In-memory database
│   ├── sampleBooks.js      # Sample book data
│   └── seedDatabase.js     # Database seeding script
└── tests/
    └── books.test.js       # Test suite
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd book-catalog-api

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Variables
Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=3000
```

## 🏃‍♂️ Running the Application

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start

# The server will be running on http://localhost:3000
```

### Health Check
Verify the API is running:
```bash
curl http://localhost:3000/health
```

## 🧪 Testing

### Automated Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Manual Testing with curl

#### Get all books
```bash
curl http://localhost:3000/api/books
```

#### Get a specific book
```bash
curl http://localhost:3000/api/books/1
```

#### Create a new book
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Pragmatic Programmer",
    "author": "David Thomas",
    "genre": "Technology",
    "publicationYear": 1999,
    "availability": true
  }'
```

#### Update a book
```bash
curl -X PUT http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "author": "Harper Lee",
    "genre": "Classic Literature",
    "publicationYear": 1960,
    "availability": false
  }'
```

#### Search books
```bash
# Search all fields
curl "http://localhost:3000/api/books/search?q=Orwell"

# Search by specific field
curl "http://localhost:3000/api/books/search?q=1984&type=title"
curl "http://localhost:3000/api/books/search?q=Orwell&type=author"
curl "http://localhost:3000/api/books/search?q=Fiction&type=genre"
```

#### Delete a book
```bash
curl -X DELETE http://localhost:3000/api/books/1
```

## 📖 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### Books Management

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/books` | Get all books | - |
| GET | `/books/:id` | Get book by ID | - |
| POST | `/books` | Create new book | Book object |
| PUT | `/books/:id` | Update book | Book object |
| PATCH | `/books/:id/availability` | Update availability | `{availability: boolean}` |
| DELETE | `/books/:id` | Delete book | - |

#### Search & Filter

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/books/search` | Search books | `q` (required), `type` (optional) |
| GET | `/books/available` | Get available books | - |
| GET | `/books/unavailable` | Get unavailable books | - |
| GET | `/books/stats` | Get catalog statistics | - |

### Book Object Structure

```json
{
  "id": "uuid",
  "title": "string (required)",
  "author": "string (required)",
  "genre": "string (required)",
  "publicationYear": "number (required)",
  "availability": "boolean (default: true)",
  "createdAt": "ISO date string",
  "updatedAt": "ISO date string"
}
```

### Response Format

#### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully"
}
```

#### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": ["Validation error details"]
}
```

### Search Types
- `all` (default) - Search in title, author, and genre
- `title` - Search in title only
- `author` - Search in author only
- `genre` - Search in genre only

## 📊 Sample Data

The API comes with 40 pre-loaded sample books covering various genres:

- **Classic Literature** - Harper Lee, F. Scott Fitzgerald
- **Science Fiction** - Frank Herbert, Isaac Asimov, Douglas Adams
- **Fantasy** - J.R.R. Tolkien, George R.R. Martin, J.K. Rowling
- **Mystery/Thriller** - Agatha Christie, Gillian Flynn
- **Non-Fiction** - History, Science, Self-Help, Memoir
- **And many more...**

### Seeding Database
```bash
# Seed with sample data (if endpoint is available)
curl -X POST http://localhost:3000/api/seed
```

## ⚡ Performance & Scalability

### Current Implementation
- **Storage**: In-memory arrays (for development/testing)
- **Performance**: Optimized for small to medium datasets
- **Concurrency**: Single-threaded Node.js event loop

### Production Considerations
For production deployment, consider:
- **Database**: Replace in-memory storage with MongoDB/PostgreSQL
- **Caching**: Implement Redis for frequently accessed data
- **Pagination**: Add pagination for large datasets
- **Rate Limiting**: Implement API rate limiting
- **Authentication**: Add user authentication and authorization

## 🛡️ Security Features

- **Helmet**: Security headers middleware
- **CORS**: Cross-origin resource sharing enabled
- **Input Validation**: Comprehensive input sanitization
- **Error Handling**: Secure error messages (no sensitive data exposure)

## 🐛 Error Handling

The API provides comprehensive error handling:

- **400 Bad Request** - Invalid input data
- **404 Not Found** - Resource not found
- **409 Conflict** - Duplicate resource
- **500 Internal Server Error** - Server errors

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Deployment
```bash
# Build and start
npm start

# Using PM2 for production
npm install -g pm2
pm2 start server.js --name "book-catalog-api"
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 Testing Scenarios

The test suite covers:

### CRUD Operations
- ✅ Create books with valid data
- ✅ Prevent creation with invalid data
- ✅ Update existing books
- ✅ Delete books
- ✅ Handle non-existent resources

### Search Functionality
- ✅ Search by title, author, genre
- ✅ Search all fields
- ✅ Handle empty search queries
- ✅ Case-insensitive search

### Edge Cases
- ✅ Duplicate prevention
- ✅ Invalid IDs
- ✅ Malformed requests
- ✅ Large datasets

### Statistics
- ✅ Genre distribution
- ✅ Availability counts
- ✅ Author statistics

## 📈 Future Enhancements

### Planned Features
- [ ] **Database Integration** - MongoDB/PostgreSQL support
- [ ] **User Authentication** - JWT-based auth
- [ ] **Book Categories** - Hierarchical categorization
- [ ] **Book Reviews** - User reviews and ratings
- [ ] **Advanced Search** - Fuzzy search, filters
- [ ] **File Upload** - Book cover images
- [ ] **Pagination** - Efficient data pagination
- [ ] **Real-time Updates** - WebSocket notifications

### API Versioning
- [ ] Version 2.0 with enhanced features
- [ ] Backward compatibility support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Write tests for new features
- Update documentation
- Ensure all tests pass

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@kalyan021004](https://github.com/kalyan021004)
- Email: kalyan021004@gmail.com

## 🙏 Acknowledgments

- Express.js for the web framework
- Jest for testing framework
- The Node.js community

---

## 📞 Support

If you have any questions or run into issues:

1. **Check the documentation** above
2. **Run the tests** to ensure everything is working
3. **Check the logs** for error messages
4. **Create an issue** on GitHub

### Common Issues

**Port already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm start
```

**Tests failing:**
```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install
npm test
```

---

**Happy coding! 🚀📚**
