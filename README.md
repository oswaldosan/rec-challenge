# Restaurant Booking API with a Social Twist

Welcome to the Restaurant Booking API project, a unique platform that combines the convenience of online booking with the excitement of social interactions.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Docker and Docker Compose
- Node.js and npm

## Setup Instructions

1. **Initialize DB**

   Use Docker Compose to start the database service. This command will pull the necessary Docker images, create a Docker container for your database, and start the service:

   ```bash
   docker-compose up -d

   ```

2. **Install Dependencies**

   Before running the application, you need to install the necessary dependencies. This project uses npm (Node Package Manager) to manage its dependencies.

   Open a terminal and run the following command in the project's root directory:

   ```bash
   npm install
   ```

3. **Run Dev Env**
   For local development copy env-example to .env and run

   ```bash
   npm run dev
   ```

# API INTERACTION

### Get Restaurants available and POST reservation

    •	Method: POST
    •	Endpoint: /restaurants
    •	Description: Creates a new reservation

```bash
 {
 "users": [
     "michael",
     "scott"
 ],
 "datetime": "2024-07-02T18:30:00Z"
 }
```

### Get All Reservations

    •	Method: GET
    •	Endpoint: /reservations/
    •	Description: Retrieves a list of all reservations in the system.

### Get Reservation for a Specific User

    •	Method: GET
    •	Endpoint: /reservations/{userId}
    •	Description: Retrieves reservations for a specific user by their user ID.

### Delete a Reservation

    •	Method: DELETE
    •	Endpoint: /reservations/{reservationId}
    •	Description: Deletes a specific reservation by reservation ID.
