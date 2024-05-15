# User management

This is a simple user management system. It is built using Laravel and Vue.js (with vuetify).

## Installation

### Prerequisites

-   node.js
-   npm
-   php
-   composer

### Steps

1. Clone the repository
1. Open a terminal
1. Move the .env.example file to .env using the command `mv .env.example .env`
1. We use sqlite as the database, so no need to configure the database
1. Run `composer install`
1. Run `php artisan key:generate`
1. Run `php artisan migrate --seed`
1. Run `php artisan serve`
1. Open a new terminal
1. Run `npm install`
1. Run `npm run dev`
1. Open your browser and go to `http://localhost:8000`

## Testing

The testing is done using phpunit. And these files are located in the `tests/Feature` directory.

To run the tests, run the command `php artisan test`

Testing were written to test the API endpoints and authentication.

Authentication tests are located in the `tests/Feature/ApiTest.php` file.

User management tests are located in the `tests/Feature/UsersTest.php` file.

## API Endpoints

The user management system has the following API endpoints:

-   GET /api/users
-   POST /api/users
-   GET /api/users/{id}
-   PUT /api/users/{id}
-   DELETE /api/users/{id}

The authentication system has the following API endpoints:

-   POST /api/auth/login
-   POST /api/auth/logout
-   POST /api/auth/signup

All the API endpoints are protected by middleware. So, you need to pass the bearer token in the header to access the endpoints.

## License

This project is licensed under the MIT License.
