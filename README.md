# Basic Transaction api

## User Routes

### Create User

- **Route**: `POST /api/users`
- **Description**: Create a new user account.
- **Demo Request Payload**:
  ```json
  {
    "username": "username",
    "password": "password",
    "balance": 1000
  }
  ```
- **Demo Response**:
  ```json
  {
    "username": "username",
    "password": "password",
    "balance": 1000,
    "acknowledged": true,
    "insertedId": 'user_id'
  }
  ```

### Get User by ID

- **Route**: `GET /api/users/:id`
- **Description**: Get user details by user ID (protected by token-based authentication).
- **Demo Response**:
  ```json
   {
    "_id": "user_id",
    "timestamp": "timestamp",
    "username": "username",
    "password": "password",
    "balance": 1000
  }
  ```

### Fund User by ID

- **Route**: `POST /api/users/fund`
- **Description**: Fund a user's account by user ID (protected by token-based authentication).
- **Demo Request Payload**:
  ```json
  {
    "id": "user_id",
    "amount": 500
  }
  ```
- **Demo Response**:
  ```json
  {
    "message": "Funds added successfully",
    "balance": 1500
  }
  ```

## Transaction Routes

### Transfer Funds

- **Route**: `POST /api/transactions/transfer`
- **Description**: Transfer funds between two user accounts (protected by token-based authentication).
- **Demo Request Payload**:
  ```json
  {
    "senderId": "sender_user_id",
    "receiverId": "receiver_user_id",
    "amount": 200
  }
  ```
- **Demo Response**:
  ```json
  {
    "message": "Funds transferred successfully"
  }
  ```

## Authentication Route

### Authenticate User

- **Route**: `POST /api/authenticate`
- **Description**: Authenticate a user and generate a token (no authentication required).
- **Demo Request Payload**:
  ```json
  {
    "username": "username",
    "password": "password"
  }
  ```
- **Demo Response**:
  ```json
  {
    "token": "your-faux-token"
  }
  ```
