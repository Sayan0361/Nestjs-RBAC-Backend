<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <strong>NestJS RBAC Backend</strong><br>
  A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications with Role-Based Access Control.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
</p>

## 📋 Description

This project is a production-ready NestJS backend application implementing **Role-Based Access Control (RBAC)** with comprehensive authentication, authorization, caching, and throttling mechanisms. The application is built with TypeScript (97.8%) and includes RESTful APIs for user management and post management with advanced security features.

### Tech Stack

- **Framework**: NestJS 11.0
- **Language**: TypeScript (97.8%), JavaScript (2.2%)
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport
- **Authorization**: Role-Based Access Control (RBAC)
- **Caching**: Cache Manager with Redis support
- **Rate Limiting**: Throttler for request throttling
- **Validation**: Class Validator & Class Transformer
- **Password Hashing**: Bcrypt

## 🚀 Features

### Authentication & Authorization
- ✅ User registration (regular users and admins)
- ✅ JWT-based authentication with refresh token support
- ✅ Role-Based Access Control (RBAC) with custom decorators and guards
- ✅ Protected endpoints with JWT strategy validation
- ✅ Comprehensive API documentation in controllers and services

### API Endpoints
- ✅ User authentication (register, login, refresh token)
- ✅ RESTful CRUD operations for posts
- ✅ Author relationship implementation
- ✅ Role-based endpoint access

### Performance & Security
- ✅ **Pagination**: Implemented for posts retrieval with limit and offset
- ✅ **Caching**: Cache manager integration for optimized data retrieval
- ✅ **Throttling**: Custom guards for rate limiting on login and post creation
- ✅ **Data Serialization**: Class serialization for sensitive data exclusion
- ✅ **Environment Variables**: Secure configuration management with joi validation
- ✅ **Database Security**: PostgreSQL with Docker setup

### Data Validation
- ✅ DTOs for input validation
- ✅ Custom pipes and validation rules
- ✅ Comprehensive error handling

## 📦 Project Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Docker (for PostgreSQL setup)

### Installation

```bash
# Install dependencies
$ npm install
```

### Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=nestjs_rbac

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=3600

# App
PORT=3000
NODE_ENV=development
```

## 🐳 Docker Setup for PostgreSQL

```bash
# Run PostgreSQL container
$ docker run --name postgres-db \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_DB=nestjs_rbac \
  -p 5432:5432 \
  -d postgres
```

## 🏃 Running the Application

```bash
# Development mode with auto-reload
$ npm run start:dev

# Production build
$ npm run build

# Production mode
$ npm run start:prod

# Debug mode
$ npm run start:debug
```

## 🧪 Testing

```bash
# Unit tests
$ npm run test

# Watch mode
$ npm run test:watch

# Test coverage
$ npm run test:cov

# E2E tests
$ npm run test:e2e
```

## 📁 Project Structure

```
src/
├── auth/              # Authentication module (JWT, login, register, refresh)
├── users/             # User management module
├── posts/             # Posts management module
│   └── dto/           # Data Transfer Objects for posts
├── guards/            # Custom guards (JWT, RBAC)
├── decorators/        # Custom decorators (Roles, User)
├── pipes/             # Custom pipes and validation
├── main.ts            # Application entry point
└── app.module.ts      # Root module configuration
```

## 📝 Commit History & Recent Updates

### Latest Changes (April 2026)

1. **Pagination & Caching Enhancement** (Apr 04, 2026)
   - Implemented pagination for posts retrieval in PostsService and PostsController
   - Integrated Cache Manager for optimized data access
   - Commit: `930064ce7b45d37965651ad4f4843a2e65f2cecb`

2. **Caching & Pagination Foundation** (Apr 01, 2026)
   - Added caching support and pagination for posts retrieval
   - Commit: `6068273225547efd674846329d06ed195f649b89`

### Security Features (March 2026)

3. **Request Throttling** (Mar 30, 2026)
   - Implemented throttling for login and post creation endpoints
   - Custom throttle guards for API protection
   - Commit: `3465f753bc80556aab4b7e0432131ef2421dfa98`

4. **Entity Relationships & Data Serialization** (Mar 29, 2026)
   - Refactored user and post entities to implement author relationships
   - Enhanced JWT validation and class serialization for sensitive data
   - Commit: `4271fc95194dcf45d5178dbd79012bf28479bc5c`

5. **API Documentation** (Mar 28, 2026)
   - Enhanced documentation in AuthController and AuthService
   - Detailed request body and header information for all endpoints
   - Commit: `af73d5447174602c4d7c3c274871e8dd33fd4d52`

### Core Implementation (March-February 2026)

6. **RBAC Implementation** (Mar 25, 2026)
   - JWT strategy configuration and passport integration
   - Custom roles guard and decorators for role-based access
   - Commit: `e96a8df3862153ef86762b272448883449c89418`

7. **JWT Strategy** (Mar 04, 2026)
   - Implemented JWT Strategy
   - Commit: `bd8a0ad14cd2e78a00c42e0e6b7f12a025c34b15`

8. **Authentication Services** (Mar 01-03, 2026)
   - Complete user registration and admin registration services
   - Login service and refresh token functionality
   - Services for Login and RefreshToken with complete controllers
   - Commits: `b02b8f02b9ea00c02e349c092eb3ca242638e85d`, `e363c9dfcbacb3652589ea5a059a435ad3fb9dae`

### Foundation Setup (February 2026)

9. **Database Setup** (Feb 16, 2026)
   - Docker PostgreSQL configuration and connection establishment
   - Commit: `b552e5f1b5271cec50b04ed60f018495ca3dce8d`

10. **Data Validation** (Feb 10, 2026)
    - DTOs, pipes and validation setup
    - Commit: `acf3a7c6210df05f724ebaf49bf2a3d7b8612769`

11. **RESTful APIs** (Feb 08, 2026)
    - Complete CRUD operations for posts management
    - Commit: `c704f3ab9f2080faa9c540297237337c9c98c9cc`

12. **Environment Setup** (Feb 01, 2026)
    - Code cleanup: Basic nestjs template (removed hello and user modules)
    - Load env variables in project
    - Commits: `782b662c31d7f3c22ea9702eb556b8e77716b98e`, `5cecaf0342ed335d5a7af55704da6950a3157caf`

13. **Project Initialization** (Jan 31, 2026)
    - Understanding Modules, Controllers and Services, Dependency Injection
    - Initial project setup with NestJS fundamentals
    - Commit: `979fdb2ec287ea56e83b5d7e1614f8144a9b0267`

## 🔐 API Examples

### Authentication Endpoints

```bash
# Register User
POST /auth/register
Content-Type: application/json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "user"
}

# Register Admin
POST /auth/register-admin
Content-Type: application/json
{
  "username": "admin_user",
  "email": "admin@example.com",
  "password": "securePassword123"
}

# Login
POST /auth/login
Content-Type: application/json
{
  "email": "john@example.com",
  "password": "securePassword123"
}

# Refresh Token
POST /auth/refresh
Headers: {
  "Authorization": "Bearer <refresh_token>"
}
```

### Posts Management Endpoints

```bash
# Get all posts with pagination (cached)
GET /posts?limit=10&offset=0
Headers: {
  "Authorization": "Bearer <jwt_token>"
}

# Create post (requires authentication, throttled)
POST /posts
Headers: {
  "Authorization": "Bearer <jwt_token>"
}
Content-Type: application/json
{
  "title": "My First Post",
  "content": "This is the content of my post"
}

# Get single post
GET /posts/:id
Headers: {
  "Authorization": "Bearer <jwt_token>"
}

# Update post (only by author or admin)
PUT /posts/:id
Headers: {
  "Authorization": "Bearer <jwt_token>"
}
Content-Type: application/json
{
  "title": "Updated Title",
  "content": "Updated content"
}

# Delete post (only by author or admin)
DELETE /posts/:id
Headers: {
  "Authorization": "Bearer <jwt_token>"
}
```

## 📚 Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [NestJS Discord Community](https://discord.gg/G7Qnnhy)
- [TypeORM Documentation](https://typeorm.io)
- [Passport Authentication](http://www.passportjs.org/)
- [JWT Documentation](https://jwt.io)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request for any improvements.

## 📄 License

This project is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## 👤 Author

**Sayan Sen**
- Email: sayansen0361@gmail.com
- GitHub: [@Sayan0361](https://github.com/Sayan0361)

---

**Last Updated**: April 5, 2026
**Language Composition**: TypeScript (97.8%), JavaScript (2.2%)