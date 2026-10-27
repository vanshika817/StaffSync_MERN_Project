# StaffSync Manual Test Cases

## Setup
Start MongoDB, configure `server/.env`, run `npm run seed`, start API and client, and sign in with a demo user.

| ID | Test | Steps | Expected |
|---|---|---|---|
| TC-01 | Successful login | Sign in using a demo account | Dashboard opens |
| TC-02 | Invalid login | Enter incorrect password | Clear error; no session |
| TC-03 | Employee access boundary | Sign in as employee and open People | API denies directory access |
| TC-04 | Leave request | Submit valid dates and reason | Pending request appears |
| TC-05 | Invalid leave dates | Choose end date before start date | Validation error |
| TC-06 | Approve leave | Sign in as HR/manager and approve pending request | Status changes |
| TC-07 | Check in | Sign in as employee and click Check in | Timestamp recorded |
| TC-08 | Duplicate check in | Click Check in again | Duplicate rejected |
| TC-09 | Check out | Check in, then click Check out | Checkout timestamp recorded |
| TC-10 | Announcement visibility | HR posts all-user announcement | All roles can view it |
| TC-11 | Targeted announcement | HR posts HR-only announcement | Only HR sees it |
| TC-12 | Training enrollment | Employee enrolls in training | Enrollment count increments |
| TC-13 | Duplicate enrollment | Enroll in same training again | Duplicate rejected |
| TC-14 | Capacity | Fill all available seats | Next enrollment rejected |
| TC-15 | Token expiration | Use expired token | API returns 401 |

Record actual result, tester, and date during project demonstration.
