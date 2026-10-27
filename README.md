# StaffSync — Modern Human Resource Management Solution

A MERN-stack HRM starter project for an individual IT project. Includes role-based authentication, employee records, leave requests/approvals, attendance, announcements, and training management.

## Stack
- Frontend: React + Vite, React Router, Bootstrap, Axios
- Backend: Node.js, Express, MongoDB/Mongoose
- Authentication: JWT (Bearer token), bcrypt password hashing
- API: REST + JSON

## Prerequisites
- Node.js 18+ (Node 16+ may work, but use a currently supported LTS release)
- npm
- MongoDB local service or MongoDB Atlas URI
- VS Code and Postman (recommended)

## Quick start
1. Install MongoDB and start it, or create a MongoDB Atlas database.
2. Open a terminal in `server/`.
3. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
4. Run:
   ```bash
   npm install
   npm run seed
   npm run dev
   ```
5. In a second terminal, open `client/`, then run:
   ```bash
   npm install
   npm run dev
   ```
6. Open the Vite URL printed in the terminal (usually `http://localhost:5173`).

## Demo accounts
The seed script creates demo accounts only when `SEED_DEMO=true`:
- HR: `hr@staffsync.local` / `StaffSync123!`
- Manager: `manager@staffsync.local` / `StaffSync123!`
- Employee: `employee@staffsync.local` / `StaffSync123!`

Change these credentials and never use demo passwords in production.

## Main API routes
- `POST /api/auth/login`
- `POST /api/auth/register` (HR only once authenticated; seed provides first HR account)
- `GET /api/employees`, `POST /api/employees`, `GET /api/employees/:id`, `PATCH /api/employees/:id`
- `GET /api/leaves`, `POST /api/leaves`, `PATCH /api/leaves/:id/status`
- `GET /api/attendance`, `POST /api/attendance/check-in`, `POST /api/attendance/check-out`
- `GET /api/announcements`, `POST /api/announcements`
- `GET /api/trainings`, `POST /api/trainings`, `POST /api/trainings/:id/enroll`

## Roles
- HR: manage employee records, view organization attendance, approve/reject leave, publish announcements, create training.
- Manager: view team requests, approve/reject leave requests (demo policy allows manager to review all pending requests; add department/team scoping for production), create and manage training.
- Employee: view/update permitted profile fields, request leave, check in/out, view announcements and trainings, enroll in training.

## Important implementation notes
This is a runnable educational starter, not a production-certified HR platform. Before real use, add password reset and email verification, audit logs, rate limiting, CSRF strategy if using cookies, stronger validation, file upload scanning, pagination, retention rules, backups, tests, and strict team-level authorization. Attendance is a simple date-based check-in/out system; it does not verify physical location or identity.

## Project structure
```
StaffSync_MERN_Project/
  client/                 React frontend
  server/                 Express REST API
  docs/                   project report + diagrams
```
