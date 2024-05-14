<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\User;
use Tests\TestCase;

class ApiTest extends TestCase
{
    public function test_reject_non_authenticated_user(): void
    {
        $response = $this->getJson('/api/auth/me');
        $response->assertStatus(401);
    }

    public function test_api_login(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200);
        // response format
        $response->assertJsonStructure([
            'access_token',
            'token_type',
            'expires_in',
        ]);
    }

    public function test_api_me(): void
    {
        $user = User::factory()->create();

        $token = auth('api')->login($user);

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->getJson('/api/auth/me');

        $response->assertStatus(200);
    }
}
