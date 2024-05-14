# Install JWT Auth
composer require tymon/jwt-auth

# Make the JWT configuration file
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"

# Set the JWT secret key
php artisan jwt:secret
