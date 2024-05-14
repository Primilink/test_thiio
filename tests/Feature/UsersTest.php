<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\User;
use Tests\TestCase;

class UsersTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_owninfo(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = auth('api')->login($admin);

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->getJson('/api/users/' . $admin->id);

        $response->assertStatus(200);
    }

    public function test_get_index(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = auth('api')->login($admin);

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->getJson('/api/users');

        $response->assertStatus(200);
    }


    public function test_create_user(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = auth('api')->login($admin);

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->postJson('/api/users', [
                'name' => 'John Doe',
                'email' => 'hello@hi.com',
                'password' => 'password',
                'role' => 'user',
            ]);

        $response->assertStatus(200);
    }

    public function test_update_user(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = auth('api')->login($admin);

        $user = User::factory()->create();

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->putJson("/api/users/{$user->id}", [
                'name' => 'John Doe',
                'email' => 'hello@hi.com',
                'password' => 'password',
                'role' => 'user',
            ]);

        $response->assertStatus(200);
    }

    public function test_delete_user(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = auth('api')->login($admin);

        $user = User::factory()->create();

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->delete("/api/users/{$user->id}");

        $response->assertStatus(200);
    }
}
