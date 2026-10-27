# StaffSync — Modern Human Resource Management Solution
## Project Report (Individual IT Project)

### 1. Abstract
StaffSync is a web-based Human Resource Management (HRM) application developed using the MERN stack: MongoDB, Express.js, React.js, and Node.js. It centralizes common HR activities such as employee record management, leave requests and approvals, attendance recording, company announcements, and training management. Role-based access distinguishes HR personnel, managers, and employees. The system aims to reduce repetitive paperwork, improve access to information, increase transparency, and provide a responsive interface for everyday HR operations.

### 2. Introduction
Organizations manage employee details, leave balances, attendance, internal communication, and training across multiple processes. Manual or disconnected systems can lead to duplicated records, delayed approvals, and poor visibility. StaffSync proposes a centralized web application in which authorized users work from a common data source while seeing capabilities appropriate to their role.

### 3. Problem Statement
Traditional HR workflows often rely on paper forms, spreadsheets, email chains, or separate tools. This can make records difficult to maintain, leave approvals slow, attendance tracking inconsistent, and announcements hard to find. A secure, accessible, and centralized HR platform is needed to simplify these activities.

### 4. Objectives
- Centralize employee profiles and organizational information.
- Provide role-based access for HR, managers, and employees.
- Allow employees to submit leave requests and track decisions.
- Record daily check-in and check-out times.
- Publish and view internal announcements.
- Create training programs and allow employees to enroll.
- Provide a responsive interface and REST API.
- Protect credentials with password hashing and authenticate API requests with JWT.

### 5. Scope
**Included:** login, role-based authorization, employee directory, employee self-service profile fields, leave submission and review, attendance check-in/check-out, announcements, training creation and enrollment, dashboard metrics, REST API, MongoDB persistence.

**Future enhancements:** leave balance calculations, approval routing by reporting manager, email notifications, password reset, document storage, payroll integration, shift/holiday calendars, audit trail, exports, analytics, mobile application, and production-grade monitoring.

### 6. Intended Users and Roles
| Role | Main permissions |
|---|---|
| HR | Manage employee records and roles, view attendance, review leave, publish announcements, create training |
| Manager | View directory filtered by department, review leave, create training |
| Employee | View own profile, request leave, check in/out, view announcements, enroll in training |

The starter's manager approval endpoint is intentionally simplified. A production deployment must scope leave review and attendance visibility to a manager's assigned team, not just a department label.

### 7. Technology Stack
| Technology | Purpose |
|---|---|
| HTML5 | Semantic application document structure |
| CSS3 | Layout, responsive design, visual styling |
| JavaScript (ES modules) | Client and server logic |
| React | Component-based UI |
| Bootstrap 5 | Form and layout utilities |
| Node.js | Server-side JavaScript runtime |
| Express.js | REST API and middleware |
| MongoDB + Mongoose | Document database and schemas |
| JWT | Stateless API authentication |
| bcryptjs | Password hashing |
| Axios | Frontend HTTP requests |
| Vite | Frontend development/build tool |
| Postman | API testing |

### 8. System Requirements
**Software:** Windows 10/11, macOS or Linux; Node.js 18+ recommended; npm; MongoDB local or Atlas; modern Chrome/Firefox/Edge; VS Code; Postman.

**Hardware:** Intel Core i5 / AMD Ryzen 5 or similar recommended; 8 GB RAM minimum (16 GB preferred); 1 GB free project space plus room for dependencies and database; 1366×768 display or higher.

### 9. Functional Requirements
- FR-01: The system shall authenticate users with email and password.
- FR-02: The system shall authorize actions according to the user's role.
- FR-03: HR shall create employee accounts and maintain employee records.
- FR-04: Employees shall submit leave requests with type, dates, and reason.
- FR-05: HR and managers shall approve or reject pending leave requests.
- FR-06: Employees shall check in and check out for the current day.
- FR-07: HR shall publish announcements for all users or a selected role.
- FR-08: Authenticated users shall view announcements targeted to them.
- FR-09: HR and managers shall create training programs.
- FR-10: Employees shall enroll in available training programs.
- FR-11: The dashboard shall show leave, announcement, and training summaries.
- FR-12: The system shall return useful errors for invalid or unauthorized requests.

### 10. Non-Functional Requirements
- Security: hash passwords; use JWT; validate role permissions; keep secrets in environment variables.
- Usability: provide clear navigation, readable forms, and status indicators.
- Performance: use indexed database fields where appropriate and paginate large collections before production.
- Reliability: handle API failures and duplicate daily attendance records.
- Maintainability: separate routes, models, middleware, and UI components.
- Portability: support modern browsers and common desktop operating systems.
- Scalability: allow API and database to be deployed independently and scaled as usage grows.
- Privacy: limit access to personal information and establish retention policies.

### 11. System Architecture
The React client sends JSON requests to the Express REST API. Authentication middleware validates the JWT and attaches the user identity. Route handlers enforce role rules, use Mongoose models to read/write MongoDB, and return JSON responses. Passwords are stored as bcrypt hashes rather than plain text.

### 12. Database Design
**User:** name, email, passwordHash, role, department, jobTitle, phone, active, timestamps.  
**Leave:** employee reference, leaveType, startDate, endDate, reason, status, reviewedBy reference, reviewNote, timestamps.  
**Attendance:** employee reference, dateKey, checkIn, checkOut, timestamps; unique index on employee + dateKey.  
**Announcement:** title, body, audience, author reference, timestamps.  
**Training:** title, description, trainer, date, durationHours, capacity, enrollments (user references), timestamps.

### 13. API Design
| Method | Endpoint | Purpose / access |
|---|---|---|
| POST | `/api/auth/login` | Authenticate |
| GET | `/api/auth/me` | Current user |
| POST | `/api/auth/register` | HR creates user |
| GET | `/api/employees` | HR/manager directory |
| GET | `/api/employees/me` | Own profile |
| PATCH | `/api/employees/:id` | Self-limited fields or HR edit |
| GET/POST | `/api/leaves` | List / submit leave |
| PATCH | `/api/leaves/:id/status` | HR/manager review |
| GET | `/api/attendance` | HR/manager attendance |
| GET | `/api/attendance/me` | Own attendance |
| POST | `/api/attendance/check-in` | Record check-in |
| POST | `/api/attendance/check-out` | Record check-out |
| GET/POST | `/api/announcements` | View / HR publish |
| GET/POST | `/api/trainings` | View / HR or manager create |
| POST | `/api/trainings/:id/enroll` | Enroll current user |

### 14. Testing Plan
| Test ID | Scenario | Expected result |
|---|---|---|
| T-01 | Login with valid credentials | Token and user returned |
| T-02 | Login with wrong password | 401 response |
| T-03 | Employee accesses HR-only employee list | 403 response |
| T-04 | Submit valid leave request | Request saved as pending |
| T-05 | End date before start date | 400 validation response |
| T-06 | Manager approves pending request | Status becomes approved |
| T-07 | Employee checks in twice | Second attempt rejected |
| T-08 | Check out without check-in | Request rejected |
| T-09 | HR publishes announcement | Announcement appears for target audience |
| T-10 | Enroll twice in same training | Second attempt rejected |
| T-11 | Training capacity reached | Further enrollment rejected |
| T-12 | Expired or invalid JWT | 401 response |

### 15. Limitations
The project is an educational starter. Attendance uses the server's UTC date key and does not implement configurable organizational time zones, GPS, or biometric verification. Leave balances and public holiday calendars are not calculated. The manager workflow requires stronger team-level scoping before production. There is no password reset, email delivery, audit logging, rate limiting, or automated test suite in this starter.

### 16. Future Enhancements
Add a configurable leave policy and balance engine, team hierarchy, manager assignment, notifications, report export, audit events, employee document management, calendar integration, advanced search, analytics, automated tests, CI/CD, and deployment monitoring.

### 17. Conclusion
StaffSync demonstrates how the MERN stack can be used to create a centralized HRM application with core employee self-service and HR workflows. Its modular architecture provides a foundation for extending the system with stricter organizational policies and production-level security controls.
