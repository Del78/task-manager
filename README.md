# Task Manager - Full Stack Application

A complete task management application with Laravel backend API and React frontend.

## Project Structure

```
task-manager-monorepo/
├── backend/          # Laravel 11 API with Sanctum authentication
├── frontend/         # React + Vite frontend
└── README.md
```

## Getting Started

### Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Visit: http://127.0.0.1:8000

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit: http://localhost:5173

## Features

- **User Authentication**: Sanctum token-based API authentication
- **Task Management**: Create, read, update, delete tasks
- **Subtasks**: Organize tasks with subtasks
- **Real-time UI**: SweetAlert2 notifications for task completion
- **Responsive Design**: Modern animated UI with Vite + React
- **PostgreSQL Database**: Persistent data storage

## Tech Stack

**Backend:**
- Laravel 11
- Laravel Sanctum (API authentication)
- PostgreSQL
- PHP 8.2+

**Frontend:**
- React 18
- Vite
- SweetAlert2
- CSS3 animations

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user (returns Sanctum token)

### Tasks (Protected)
- `GET /api/v1/tasks` - Get all tasks
- `POST /api/v1/tasks` - Create task
- `PUT /api/v1/tasks/{id}` - Update task
- `DELETE /api/v1/tasks/{id}` - Delete task

### Subtasks (Protected)
- `POST /api/v1/subtasks` - Create subtask
- `PUT /api/v1/subtasks/{id}` - Update subtask
- `DELETE /api/v1/subtasks/{id}` - Delete subtask

## Database

Default connection: PostgreSQL
Configuration: `backend/.env`

Required tables:
- users
- tasks
- sub_tasks
- personal_access_tokens (Sanctum)

## Development

1. Ensure PostgreSQL is running
2. Start backend server: `php artisan serve`
3. Start frontend server: `npm run dev`
4. Open http://localhost:5173 in browser
5. Register or login to access the dashboard

## License

MIT
