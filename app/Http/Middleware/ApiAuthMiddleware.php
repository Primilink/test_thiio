<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\JWT;

class ApiAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->header('Authorization');

        if (!$token) {
            return response()->json(['error' => 'Unauthorized middleware'], 401);
        }

        try {
            // $decoded = JWT::decode($token, 'your_secret_key', ['HS256']);
            // You can access the decoded token data using $decoded->property_name
            // For example: $decoded->user_id

            // Perform any additional authentication or authorization checks here

            // If everything is valid, proceed to the next middleware
            return $next($request);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }

        return $next($request);
    }
}
