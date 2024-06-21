# Campaign Manager API

This project is a RESTful API for managing campaigns, built with Nest.js and MongoDB. It provides CRUD operations for campaigns, including soft delete functionality. The API is containerized using Docker and Docker Compose.

## Features

- Create campaigns
- Read campaigns
- Update campaigns
- Soft delete campaigns
- Automatic validation of campaign dates
- MongoDB integration with Mongoose
- API documentation with Swagger

## Technologies

- Nest.js
- MongoDB
- Mongoose
- Docker
- Docker Compose

## API Endpoints

- `POST /campaigns` - Create a new campaign
- `GET /campaigns` - Retrieve all campaigns
- `GET /campaigns/:id` - Retrieve a campaign by ID
- `PUT /campaigns/:id` - Update a campaign by ID
- `DELETE /campaigns/:id` - Soft delete a campaign by ID

## Campaign Data Structure

Each campaign has the following fields:

- `_id` (string): Unique identifier
- `name` (string): Name of the campaign
- `dateStart` (Date): Start date of the campaign
- `dateEnd` (Date): End date of the campaign
- `status` (string): Status of the campaign ("active", "paused", or "expired")
- `category` (string): Category of the campaign (based on predefined set of categories)
- `isActive` (boolean): Indicates if the campaign is active (for soft delete)
- `createdAt` (Date): Date and time the campaign was created (generated automatically)
- `updatedAt` (Date): Date and time the campaign was updated (generated automatically)

## Validation Rules

- The end date (`dateEnd`) must be later than the start date (dateStart).
- The start date (`dateStart`) must be in the future at the time of creation.
- If the end date (`dateEnd`) is in the past, the campaign status is automatically set to "expired".

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repository:

  ```bash
    git clone https://github.com/pedrocezar/campaign-manager.git
    cd campaign-manager
  ```

2. Install the dependencies:

  ```bash
    npm install
  ```

### Running the Application with NPM

1. Start the MongoDB application using Docker Compose:

  ```bash
    cd src
    docker-compose up --build
  ```

2. Update the .env file in the root directory with the following content:

  ```bash
    MONGO_URI=mongodb://root:example@localhost:27017/nest?authSource=admin
  ```

3. Run aplication with npm.

  ```bash
    npm run start:dev
  ```

4. Swagger documentation is available at http://localhost:3000/swagger.

### Running the Application with Docker

1. Start the MongoDB and Nest.js application using Docker Compose:

  ```bash
    docker-compose up --build
  ```

2. The API will be available at http://localhost:3000.

3. Swagger documentation is available at http://localhost:3000/swagger.

## Running Tests

1. To run the tests, use the following command:

  ```bash
    npm run test
  ```
