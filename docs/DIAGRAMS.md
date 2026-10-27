# StaffSync Diagrams

The following Mermaid diagrams can be pasted into Mermaid Live Editor, compatible Markdown viewers, or project documentation.

## 1. System Architecture
```mermaid
flowchart LR
  U[HR / Manager / Employee] --> UI[React UI + Bootstrap]
  UI -->|HTTPS JSON + JWT| API[Express REST API]
  API --> AUTH[JWT Authentication & Role Authorization]
  AUTH --> ROUTES[Route Controllers]
  ROUTES --> ODM[Mongoose Models]
  ODM --> DB[(MongoDB)]
```

## 2. Use Case Diagram
```mermaid
flowchart LR
  HR[HR Personnel]
  M[Manager]
  E[Employee]
  subgraph StaffSync
    UC1((Sign in))
    UC2((Manage employee records))
    UC3((Review leave requests))
    UC4((Submit leave request))
    UC5((Check in / Check out))
    UC6((View announcements))
    UC7((Publish announcements))
    UC8((Create training))
    UC9((Enroll in training))
    UC10((View attendance))
  end
  HR --> UC1
  M --> UC1
  E --> UC1
  HR --> UC2
  HR --> UC3
  M --> UC3
  E --> UC4
  E --> UC5
  E --> UC6
  HR --> UC6
  M --> UC6
  HR --> UC7
  HR --> UC8
  M --> UC8
  E --> UC9
  HR --> UC10
  M --> UC10
```

## 3. ER / Data Model
```mermaid
erDiagram
  USER ||--o{ LEAVE : submits
  USER o|--o{ LEAVE : reviews
  USER ||--o{ ATTENDANCE : records
  USER ||--o{ ANNOUNCEMENT : authors
  USER }o--o{ TRAINING : enrolls
  USER {
    ObjectId _id
    string name
    string email
    string passwordHash
    string role
    string department
    string jobTitle
  }
  LEAVE {
    ObjectId _id
    ObjectId employee
    string leaveType
    date startDate
    date endDate
    string status
    ObjectId reviewedBy
  }
  ATTENDANCE {
    ObjectId _id
    ObjectId employee
    string dateKey
    datetime checkIn
    datetime checkOut
  }
  ANNOUNCEMENT {
    ObjectId _id
    string title
    string body
    string audience
    ObjectId author
  }
  TRAINING {
    ObjectId _id
    string title
    date date
    number capacity
  }
```

## 4. Leave Approval Activity Diagram
```mermaid
flowchart TD
  A([Start]) --> B[Employee enters leave type, dates and reason]
  B --> C{Input valid?}
  C -- No --> D[Show validation error]
  D --> B
  C -- Yes --> E[Save request as Pending]
  E --> F[HR or Manager reviews request]
  F --> G{Approve?}
  G -- Yes --> H[Set status to Approved]
  G -- No --> I[Set status to Rejected]
  H --> J[Employee views updated status]
  I --> J
  J --> K([End])
```

## 5. Login Sequence Diagram
```mermaid
sequenceDiagram
  actor User
  participant UI as React UI
  participant API as Express API
  participant DB as MongoDB
  User->>UI: Enter email and password
  UI->>API: POST /api/auth/login
  API->>DB: Find user by email
  DB-->>API: User hash and role
  API->>API: Compare password with bcrypt
  alt Credentials valid
    API-->>UI: JWT + user profile
    UI->>UI: Store token and open dashboard
  else Invalid credentials
    API-->>UI: 401 error
    UI-->>User: Display error
  end
```

## 6. Deployment Diagram
```mermaid
flowchart TB
  subgraph Client Device
    Browser[Modern Browser]
    React[Built React Assets]
    Browser --> React
  end
  subgraph Application Host
    Node[Node.js Runtime]
    Express[Express REST API]
    Node --> Express
  end
  subgraph Database Host
    Mongo[(MongoDB)]
  end
  React -->|HTTPS API requests| Express
  Express -->|Mongoose connection| Mongo
```
