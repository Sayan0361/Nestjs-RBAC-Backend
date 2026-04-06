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

## Description

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

## Features

### Authentication & Authorization
- User registration (regular users and admins)
- JWT-based authentication with refresh token support
- Role-Based Access Control (RBAC) with custom decorators and guards
- Protected endpoints with JWT strategy validation
- Comprehensive API documentation in controllers and services

### API Endpoints
- User authentication (register, login, refresh token)
- RESTful CRUD operations for posts
- Author relationship implementation
- Role-based endpoint access

### Performance & Security
- **Pagination**: Implemented for posts retrieval with limit and offset
- **Caching**: Cache manager integration for optimized data retrieval
- **Throttling**: Custom guards for rate limiting on login and post creation
- **Data Serialization**: Class serialization for sensitive data exclusion
- **Environment Variables**: Secure configuration management with joi validation
- **Database Security**: PostgreSQL with Docker setup

### Data Validation
- DTOs for input validation
- Custom pipes and validation rules
- Comprehensive error handling

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- pnpm 
- Docker Engine(for PostgreSQL setup)
- Postman for API Testing
  
** Install pnpm globally if you have never installed it before : 
 ```bash
$ npm i -g pnpm
$ pnpm -v
```

### Install the dependencies

```bash
$ pnpm install
```

### Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
APP_NAME=NESTJS

# Postgres setup info
DB_HOST=localhost
DB_PORT=5432
DB_USER=your-username
DB_PASS=your-password
DB_NAME=your-database-name

#JWT
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

## Docker Setup for PostgreSQL

```bash
# Run PostgreSQL container
$ docker compose up -d
```

## Running the Application

```bash
# Development mode with auto-reload
$ pnpm start:dev

# Production build
$ pnpm build

# Production mode
$ pnpm start:prod

# Debug mode
$ pnpm start:debug
```

## API Contract

## Base URL

```
http://localhost:3000
```

## Authentication

Most endpoints require a Bearer token in the Authorization header: (except Register User and Refresh Token)

```
Authorization: Bearer <access_token>
```

---

## Auth Endpoints

### 1. Register User

Create a new user account.

| Field | Value |
|-------|-------|
| Method Type | POST |
| Request URL | `{{baseURL}}/auth/register` |
| Headers | None |
| Body | `{ "email": "user@example.com", "name": "username", "password": "password123" }` |

---

### 2. Login

Authenticate and receive access token.

| Field | Value |
|-------|-------|
| Method Type | POST |
| Request URL | `{{baseURL}}/auth/login` |
| Headers | None |
| Body | `{ "email": "user@example.com", "password": "password123" }` |

---

### 3. Refresh Token

Get a new access token using a refresh token.

| Field | Value |
|-------|-------|
| Method Type | POST |
| Request URL | `{{baseURL}}/auth/refresh` |
| Headers | None |
| Body | `{ "refreshToken": "your_refresh_token_here" }` |

---

### 4. Get Profile

Get current authenticated user's profile.

| Field | Value |
|-------|-------|
| Method Type | GET |
| Request URL | `{{baseURL}}/auth/profile` |
| Headers | `Authorization: Bearer <access_token>` |
| Body | None |

---

### 5. Create Admin (Admin only)

Create a new admin account. Requires ADMIN role.

| Field | Value |
|-------|-------|
| Method Type | POST |
| Request URL | `{{baseURL}}/auth/create-admin` |
| Headers | `Authorization: Bearer <admin_access_token>` |
| Body | `{ "email": "admin@example.com", "name": "adminname", "password": "admin123" }` |

---

## Initial Super Admin Setup

1. Generate password hash:
   ```javascript
   bcrypt.hash('123456', 10)
   ```

2. Insert into database:
   ```sql
   INSERT INTO "user_entity" (email, name, password, role)
   VALUES ('admin@gmail.com', 'Admin', '<hash>', 'admin');
   ```

3. Login credentials:
   ```json
   {
     "email": "admin@gmail.com",
     "password": "123456"
   }
   ```

---

## Role Based Access Control

| Role | Permissions |
|------|-------------|
| USER | Access own profile only |
| ADMIN | Create new admin users |

---

## Post Endpoints

### 1. Get All Posts

Get paginated list of posts with optional search.

| Field | Value |
|-------|-------|
| Method Type | GET |
| Request URL | `{{baseURL}}/posts` |
| Headers | None |
| Query Parameters | `search` (optional), `page` (optional, default: 1), `limit` (optional, default: 10) |
| Body | None |

**Examples:**
- `{{baseURL}}/posts`
- `{{baseURL}}/posts?search=getting`
- `{{baseURL}}/posts?page=2&limit=10`

---

### 2. Get Single Post

Get a specific post by ID.

| Field | Value |
|-------|-------|
| Method Type | GET |
| Request URL | `{{baseURL}}/posts/{id}` |
| Headers | None |
| Path Parameters | `id` (integer) |
| Body | None |

**Example:** `{{baseURL}}/posts/4`

---

### 3. Create Post

Create a new post. Requires authentication.

| Field | Value |
|-------|-------|
| Method Type | POST |
| Request URL | `{{baseURL}}/posts` |
| Headers | `Authorization: Bearer <access_token>` |
| Body | `{ "title": "Post title", "content": "Post content", "authorName": "Author name" }` |

---

### 4. Update Post

Update an existing post. Requires authentication.

| Field | Value |
|-------|-------|
| Method Type | PUT |
| Request URL | `{{baseURL}}/posts/{id}` |
| Headers | `Authorization: Bearer <access_token>` |
| Path Parameters | `id` (integer) |
| Body | `{ "title": "Updated title", "content": "Updated content" }` |

**Example:** `{{baseURL}}/posts/1`

---

### 5. Delete Post

Delete a post by ID. Requires authentication.

| Field | Value |
|-------|-------|
| Method Type | DELETE |
| Request URL | `{{baseURL}}/posts/{id}` |
| Headers | `Authorization: Bearer <access_token>` |
| Path Parameters | `id` (integer) |
| Body | None |

**Example:** `{{baseURL}}/posts/1`

---

## Rate Limiting using CacheManager

Create, update, and delete operations are protected by a throttler. Excessive requests will be rejected for a minute.

---

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [YouTube Tutorial](https://youtu.be/XVZ10uFY9DU?si=VZ6gEsp1_rpqXI8)
