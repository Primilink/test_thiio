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

    public function test_authorization(): void
    {
        User::factory(10)->create();

        $user = User::factory()->create(['role' => 'user']);
        $token = auth('api')->login($user);

        // Get own info
        $response = $this->withHeader('Authorization', "Bearer $token")
            ->getJson('/api/users/' . $user->id);

        $response->assertStatus(200);

        // get info of another user
        $anotherUser = User::factory()->create();
        $response = $this->withHeader('Authorization', "Bearer $token")
            ->getJson('/api/users/' . $anotherUser->id);

        $response->assertStatus(401);

        // Get all users
        $response = $this->withHeader('Authorization', "Bearer $token")
            ->getJson('/api/users');

        $response->assertStatus(401);


        // Create user
        $response = $this->withHeader('Authorization', "Bearer $token")
            ->postJson('/api/users', [
                'name' => 'John Doe',
                'email' => 'asdas@asda.com',
                'password' => 'password',
                'role' => 'user',
            ]);

        $response->assertStatus(401);

        // Update user
        $response = $this->withHeader('Authorization', "Bearer $token")
            ->putJson('/api/users/' . $user->id, [
                'name' => 'John Doe',
                'email' => 'asdas@asda.com',
                'password' => 'password',
                'role' => 'user',
            ]);

        $response->assertStatus(200);

        // Update another user

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->putJson('/api/users/' . $anotherUser->id, [
                'name' => 'John Doe',
                'email' => 'asdas@asda.com',
                'password' => 'password',
                'role' => 'user',
            ]);

        $response->assertStatus(401);

        // Delete user
        $response = $this->withHeader('Authorization', "Bearer $token")
            ->delete('/api/users/' . $user->id);

        $response->assertStatus(401);
    }
}
