<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        if ($request->user()->cannot('viewAny', User::class)) {
            return response()->json([
                'error' => 'Unauthorized',
            ], 401);
        }

        $users = User::paginate(10);

        return response()->json([
            'data' => $users,
        ]);
    }

    public function show(Request $request, User $user): JsonResponse
    {
        if ($request->user()->cannot('view', $user)) {
            return response()->json([
                'error' => 'Unauthorized',
            ], 401);
        }

        return response()->json([
            'data' => $user,
        ]);
    }


    public function store(Request $request): JsonResponse
    {
        if ($request->user()->cannot('create', User::class)) {
            return response()->json([
                'error' => 'Unauthorized',
            ], 401);
        }

        $user = User::create($request->all());

        return response()->json([
            'data' => $user,
        ]);
    }

    public function update(Request $request, User $user): JsonResponse
    {
        if ($request->user()->cannot('update', $user)) {
            return response()->json([
                'error' => 'Unauthorized',
            ], 401);
        }

        $user->update($request->all());

        return response()->json([
            'data' => $user,
        ]);
    }

    public function destroy(Request $request, User $user): JsonResponse
    {
        if ($request->user()->cannot('delete', $user)) {
            return response()->json([
                'error' => 'Unauthorized',
            ], 401);
        }

        // cannot delete self
        if ($request->user()->id === $user->id) {
            return response()->json([
                'error' => 'Cannot delete self',
            ], 400);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully',
        ]);
    }
}
