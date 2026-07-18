# StudyOS Backend

Backend API for **StudyOS**, a study management application built with **Express.js**, **TypeScript**, and **PostgreSQL**.

## Tech Stack

- Express.js
- TypeScript
- PostgreSQL
- JWT Authentication
- bcrypt
- express-validator

## Features

- Authentication (Register/Login)
- User Profile
- User Settings
- Subjects
- Notes
- Assignments
- Study Sessions

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```env
PORT=3001
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
```

## Run

Development

```bash
npm run dev
```

Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── config/
├── database/
├── middleware/
├── modules/
├── shared/
├── app.ts
└── server.ts
```

## API Modules

- Auth
- Users
- User Settings
- Subjects
- Notes
- Assignments
- Study Sessions

## License

MIT