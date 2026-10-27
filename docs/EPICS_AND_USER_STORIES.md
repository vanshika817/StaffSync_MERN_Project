# StaffSync — Epics, User Stories, and Tasks

## Epic 1: Authentication and Role Management
1. As a user, I want to sign in securely so that I can access my workspace.
   - Build login form and validation.
   - Implement bcrypt password verification and JWT.
   - Add authentication middleware and role guard.
2. As HR, I want to create accounts with roles so that access matches responsibilities.
   - Add employee creation API.
   - Validate email uniqueness and password length.
   - Test role-based permissions.

## Epic 2: Employee Records
3. As HR, I want to maintain employee records so that organizational data stays current.
   - Create user schema and employee endpoints.
   - Build employee directory table.
   - Add edit and deactivate flows.
4. As an employee, I want to maintain permitted personal details.
   - Add self-profile endpoint.
   - Restrict self-editable fields.
   - Display profile information.

## Epic 3: Leave Management
5. As an employee, I want to submit leave requests.
   - Build leave request form.
   - Validate date range and required fields.
   - Save request with pending status.
6. As a manager or HR user, I want to review leave requests.
   - Display pending requests.
   - Add approve/reject actions.
   - Save reviewer and decision.

## Epic 4: Attendance Management
7. As an employee, I want to check in and check out.
   - Add attendance schema and unique employee/date index.
   - Build check-in/check-out controls.
   - Prevent duplicate or invalid actions.
8. As HR, I want to review attendance records.
   - Add attendance list endpoint.
   - Show date and time columns.
   - Add pagination and exports in a future iteration.

## Epic 5: Announcements and Communication
9. As HR, I want to publish announcements to an audience.
   - Build announcement form.
   - Add audience targeting.
   - Display latest announcements on dashboard.
10. As a user, I want to see relevant announcements.
   - Filter by audience.
   - Show author and date.
   - Add read receipts as a future enhancement.

## Epic 6: Training and Development
11. As HR or a manager, I want to create training programs.
   - Add training model and creation endpoint.
   - Build training form and listing.
   - Validate capacity and date.
12. As an employee, I want to enroll in training.
   - Add enrollment endpoint.
   - Prevent duplicate enrollment.
   - Enforce capacity.

## Suggested 19-task tracker
| # | Task | Epic |
|---:|---|---|
| 1 | Initialize React/Vite client | Authentication |
| 2 | Initialize Express server | Authentication |
| 3 | Connect MongoDB and configure environment | Authentication |
| 4 | Implement user schema and seed accounts | Authentication |
| 5 | Implement login, JWT, and role middleware | Authentication |
| 6 | Create employee directory API | Employee Records |
| 7 | Create employee directory UI | Employee Records |
| 8 | Implement employee profile update permissions | Employee Records |
| 9 | Create leave schema and submission API | Leave Management |
| 10 | Build leave request form | Leave Management |
| 11 | Build leave review workflow | Leave Management |
| 12 | Create attendance check-in/check-out API | Attendance |
| 13 | Build attendance UI and record list | Attendance |
| 14 | Create announcement API and audience filter | Announcements |
| 15 | Build announcement publishing and listing UI | Announcements |
| 16 | Create training CRUD and enrollment API | Training |
| 17 | Build training cards and enrollment UI | Training |
| 18 | Add dashboard metrics and responsive styling | General |
| 19 | Run functional tests and finalize documentation | Quality |
