# API Testing – Postman

This folder contains Postman-based manual testing evidence for the backend APIs.

## Tested Endpoints

### Authentication
- POST /auth/register
- POST /auth/login
- GET /me (protected)

### Projects
- POST /projects (protected)
- GET /projects (protected)

## Notes
- All protected routes were tested with and without JWT.
- Unauthorized access correctly returns 401.
- JWT is validated via Authorization: Bearer token.
